import React, { Component } from 'react';
import { DeliveryType } from '../../../Enums';
import './EventCard.css';
import green_truck from '../../../icons/green_truck.svg';
import grey_truck from '../../../icons/grey_truck.svg';
import moment from 'moment';
import { StringFormat } from '../../../Enums';
import Dialog from '../Dialog.js';
// import { start } from 'repl';
// import { start } from 'repl';

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        console.log(this.props.delivery);
        let eventType = DeliveryType.RECURRING;
        if (this.props.delivery.isEmergency) {
            eventType = DeliveryType.EMERGENCY;
        }
        let typeHeader = '';
        if (eventType === DeliveryType.RECURRING) {
            typeHeader = 'Reccuring Pick Up';
        }
        let truck = '';
        let truckAlt = '';
        let style = '';
        if (this.props.futureEvent) {
            truck = green_truck;
            truckAlt = 'green truck';
            style = 'event-container event-container-future';
        } else {
            truck = grey_truck;
            truckAlt = 'grey truck';
            style = 'event-container event-container-past';
        }
        // let startTime = this.props.delivery[0].startTimestamp;
        // let endTime = this.props.delivery[0].endTimestamp;

        let startTime = moment(this.props.delivery.startTimestamp).format(
            StringFormat.TIME
        );
        let endTime = moment(this.props.delivery.endTimestamp).format(
            StringFormat.TIME
        );
        console.log(this.props.delivery);
        console.log(startTime);
        // console.log(this.props.events[0][e]);

        return (
            <div>
                {this.state.dialogOpen ? (
                    <Dialog
                        closeDialog={this.closeDialog}
                        delivery={this.props.delivery}
                        futureEvent={this.props.futureEvent}
                        eventType={eventType}
                        startTime={this.props.delivery.startTimestamp}
                        endTime={this.props.delivery.endTimestamp}
                    />
                ) : null}
                <div className={style} onClick={this.openDialog}>
                    <h1 className="event-header">{typeHeader}</h1>
                    <img className="truck-icon" src={truck} alt={truckAlt} />
                    <p className="event-time">
                        {startTime} - {endTime}
                        {/* {moment(startTime * 1000).format(StringFormat.TIME)} -{' '}
                        {moment(endTime * 1000).format(StringFormat.TIME)} */}
                    </p>
                </div>
            </div>
        );
    }
}
export default EventCard;
