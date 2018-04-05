import React, { Component } from 'react';
import './AssignVolunteers.css';
import Edit from './Edit';
import Confirmation from './Confirmation';
import AssignVolunteersIndex from './AssignVolunteersIndex';

class AssignVolunteersController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            deliveries: [],
            selectedDelivery: -1,
            s1name: '',
            s1phone: '',
            s1email: '',
            s2name: '',
            s2phone: '',
            s2email: '',
            onConfirm: false
        };
    }

    // TODO: Manually setting the values for now. Values would need to be queried from DB
    // TODO: componentDidMount()?
    // TODO: Add the month navigation header bar

    componentWillMount() {
        let deliveryList = [];
        deliveryList.push({
            date: '2018-02-28',
            startTime: '14:00',
            endTime: '17:00',
            donatingAgency: {
                agency: 'Local Point',
                address: 'Test Address',
                primaryContact: {
                    name: 'Alice',
                    phone: '773-993-9922'
                }
            },
            receivingAgency: {
                agency: 'Union Gospel Shelter',
                primaryContact: {
                    name: 'Bob',
                    email: 'bob@uniongospel.org',
                    phone: '123-789-4560'
                }
            },
            delivererGroup: {
                group: 'Deliverer Test Group',  // uid-key of deliverer-group
                deliverers: [
                    {
                        name: 'Alice',
                        email: 'alice@uw.edu',
                        phone: '123-789-4560'
                    },
                    {
                        name: 'Chris',
                        email: 'chris@uw.edu',
                        phone: '456-123-0789'
                    }
                ]
            },
            description: {
                foodItems: [
                    {
                        food: 'Baked beans',
                        quantity: 15,
                        unit: 'lb'  // Enums.FoodUnit
                    },
                    {
                        food: 'Bread',
                        quantity: 4,
                        unit: 'loaves'  // Enums.FoodUnit
                    },
                ]
            }
        });
        deliveryList.push({
            date: '2018-02-26',
            startTime: '14:00',
            endTime: '17:00',
            donatingAgency: {
                agency: 'Local Point',
                address: 'Test Address',
                primaryContact: {
                    name: 'Alice',
                    phone: 7739939922
                }
            },
            receivingAgency: {
                agency: 'Union Gospel Shelter',
                primaryContact: {
                    name: 'Bob',
                    email: 'bob@uniongospel.org',
                    phone: 1237894560
                }
            },
            delivererGroup: {
                group: 'Deliverer Test Group',  // uid-key of deliverer-group
                deliverers: [
                    
                ]
            },
            description: {
                foodItems: [
                    {
                        food: 'Baked beans',
                        quantity: 15,
                        unit: 'lb'  // Enums.FoodUnit
                    },
                    {
                        food: 'Bread',
                        quantity: 4,
                        unit: 'loaves'  // Enums.FoodUnit
                    },
                ]
            }
        });
        this.setState({
            deliveries: deliveryList
        });
    }

    render() {
        return (
            <div className="container">

                {
                    this.state.onConfirm ? 
                    <Confirmation
                        handleCloseClick={this.handleCloseClick.bind(this)}
                        handleSave={this.handleSave.bind(this)}
                        delivery={this.state.deliveries[this.state.selectedDelivery]}
                        s1name={this.state.s1name}
                        s1phone={this.state.s1phone}
                        s1email={this.state.s1email}
                        s2name={this.state.s2name}
                        s2phone={this.state.s2phone}
                    /> :
                    this.showStep()

                }

            </div>
        );

    }

    // Backend TODO: Write to DB here
    handleConfirmClick(s1name, s1phone, s1email, s2name, s2phone, s2email) {
        this.setState({
            onConfirm: true,
            s1name: s1name,
            s1phone: s1phone,
            s1email: s1email,
            s2name: s2name,
            s2phone: s2phone,
            s2email: s2email
        });
    }

    handleCloseClick() {
        this.setState({
            step: 1
        });
    }

    handleEditClick(e) {
        this.setState({
            step: 1,
            selectedDelivery: e.target.id
        });
    }

    handleCancelClick() {
        this.setState({
            step: 0
        });
    }

    // Backend TODO: Write to DB

    handleSave() {
        this.setState({
            step: 0
        });
    }

    showStep() {
        switch(this.state.step) {

        case 0:
            return (
                <AssignVolunteersIndex 
                    handleEditClick={this.handleEditClick.bind(this)}
                    deliveries={this.state.deliveries}
                />
            );

        case 1:
            return (
                <Edit 
                    delivery={this.state.deliveries[this.state.selectedDelivery]}
                    handleConfirmClick={this.handleConfirmClick.bind(this)}
                    handleCancelClick={this.handleCancelClick.bind(this)}
                />
            );
        case 2:
            return (
                <Confirmation
                    handleCloseClick={this.handleCloseClick.bind(this)}
                    handleSave={this.handleSave.bind(this)}
                    delivery={this.state.deliveries[this.state.selectedDelivery]}
                    s1name={this.state.s1name}
                    s1phone={this.state.s1phone}
                    s1email={this.state.s1email}
                    s2name={this.state.s2name}
                    s2phone={this.state.s2phone}
                />
            );
        default:
            return (
                <div />
            );

        }

    }
}

export default AssignVolunteersController;