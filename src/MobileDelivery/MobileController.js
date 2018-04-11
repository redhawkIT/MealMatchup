import React from 'react';
import './Mobile.css';
import MobileStart from './MobileStart';
import MobilePickup from './MobilePickup';
import MobileDelivery from './MobileDelivery';
import MobileComplete from './MobileComplete';
import { DeliveryStatus } from '../Enums';
import moment from 'moment';

import firebase from '../FirebaseConfig';
const db = firebase.database();

class MobileController extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            umbrellaId: '',
            deliveryId: '',
            deliveryDbRefPath: '',
            deliveryObj: {
                date: '',
                startTime: '',
                endTime: '',
                isEmergency: null,
                donatingAgency: {},
                receivingAgency: {},
                delivererGroup: { // delivererGroup is null if isEmergency=true
                    group: '', 
                    deliverers: [],
                },
                description: {},
                notes: ''
            },
            receivingAgency :{
                agency: '',
                primaryContact: {},
                notes: '',
                address: {},
            },
            donatingAgency :{
                agency: '',
                primaryContact: {},
                address: {},
            },
        };
        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        const { uId: umbrellaId, dId: deliveryId} = this.props.match.params;
        const deliveryDbRefPath = `deliveries/${umbrellaId}/${deliveryId }`;
        this.setState({ deliveryDbRefPath: deliveryDbRefPath });

        db.ref(deliveryDbRefPath).on('value', (snapshot) => {  // listen data onchange
            const deliveryData = snapshot.val();
            this.aggrDelivery(deliveryData);
        });
    }

    componentWillUnmount() {
        db.ref(this.state.deliveryDbRefPath).off();  // detach listener
    }

    async aggrDelivery(deliveryData) {
        this.fetchDa(deliveryData.donatingAgency);
        this.fetchRa(deliveryData.receivingAgency);

        if (deliveryData.delivererGroup) { // Non-Emergency Pick Up: deliveryData.delivererGroup != null
            // get delivererGroup name
            let dgObj = await db.ref(`accounts/${deliveryData.delivererGroup.group}`).once('value');
            deliveryData.delivererGroup.group = dgObj.val().name;           
        } else { // Emergency Pick Up: deliveryData.delivererGroup == null
            deliveryData.delivererGroup = { group: '', deliverers: []};
        }

        this.setState({ deliveryObj: this.getDeliveryObj(deliveryData)});
    }
    
    getDeliveryObj(rawDelivery) {
        let deliveryObj = ( // pick entries from rawDelivery
            ({ description, delivererGroup, notes, isEmergency, status, pickedUpInfo, deliveredInfo }) => 
                ({ description, delivererGroup, notes, isEmergency, status, pickedUpInfo, deliveredInfo })
        )(rawDelivery);

        let startTimeObj = moment.unix(rawDelivery.startTimestamp);
        let endTimeObj = moment.unix(rawDelivery.endTimestamp);

        deliveryObj.date = startTimeObj.format('YYYY-MM-DD');
        deliveryObj.startTime = startTimeObj.format('HH:mm');
        deliveryObj.endTime = endTimeObj.format('HH:mm');
        return deliveryObj;
    }

    async fetchDa(rawDa) {
        let daPromise = new Promise( async (resolve, reject) => {
            let daSnapshot = await db.ref(`donating_agencies/${rawDa.agency}`).once('value');
            resolve(daSnapshot.val());
        });

        let daMemberPromise = new Promise( async (resolve, reject) => {
            let daMemberSnapshot = await db.ref(`accounts/${rawDa.primaryContact}`).once('value');
            resolve(daMemberSnapshot.val());
        });

        let daData = await Promise.all([daPromise, daMemberPromise]);
        this.aggrDa(daData[0], daData[1]);
    }

    aggrDa(daData, daMemberData) {
        let pickedPrimaryContact = (
            ({ position, name, email, phone }) => ({ position, name, email, phone })
        )(daMemberData);
        
        let daObj = {
            primaryContact: pickedPrimaryContact,
            agency: daData.name,
            address: this.aggrAddress(daData.address),
        };
        this.setState({ donatingAgency: daObj});
    }

    async fetchRa(rawRa) {
        let raSnapshot = await db.ref(`accounts/${rawRa.agency}`).once('value');
        this.aggrRa(raSnapshot.val(), rawRa.primaryContact);
    }

    aggrRa(raMeta, raPrimaryContact) {
        let raObj = {
            primaryContact: raPrimaryContact,
            agency: raMeta.name,
            notes: raMeta.deliveryNotes,
            address: this.aggrAddress(raMeta.address),
        };
        this.setState({ receivingAgency: raObj});
    }

    aggrAddress(rawAddress) {
        let address = rawAddress;
        // street2 and officeNo fallback
        address.street2 = rawAddress.street2 ? rawAddress.street2 : '';
        address.officeNo = rawAddress.officeNumber ? rawAddress.officeNumber : '';
        return address;
    }

    renderView() {
        switch (this.state.deliveryObj.status) {
        case DeliveryStatus.SCHEDULED:
            return <MobileStart 
                deliveryObj={this.state.deliveryObj}
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency}
                dbRef={this.state.deliveryDbRefPath}/>;
        case DeliveryStatus.IP:
            return <MobilePickup 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                dbRef={this.state.deliveryDbRefPath}
            />;
        case DeliveryStatus.PICKED_UP:
            return <MobileDelivery 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                dbRef={this.state.deliveryDbRefPath}
            />;
        case DeliveryStatus.COMPLETED: 
            return <MobileComplete 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
            />;
        default:
            return null;
        }
    }

    render() {
        if (this.state.donatingAgency.agency && 
            this.state.receivingAgency.agency && 
            this.state.deliveryObj.delivererGroup) { // return view if all data is back
            return (
                <div className="mobile-wrapper">
                    { this.renderView() } 
                </div>
            );
        }
        return null;
    }
}

export default MobileController;