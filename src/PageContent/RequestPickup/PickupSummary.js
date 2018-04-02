import React from 'react';
import './PickupSummary.css';
import truck from '../../icons/green-truck.svg';
import Map from '../../Map/Map.js';
import { RequestRepeatType, RequestDurationType } from '../../Enums.js';

class PickupSummary extends React.Component {

    render() {
        var repeatMap = {
            [RequestRepeatType.WEEKLY]: 'every ' + this.props.dayOfWeek,
            [RequestRepeatType.BIWEEKLY]: 'every other ' + this.props.dayOfWeek,
            // TODO: calculate nth day of month
            [RequestRepeatType.MONTHLY]: 'monthly',
        };

        var durationText = '';
        if (this.props.request.duration.type === RequestDurationType.RECUR) {
            durationText = this.props.request.duration.value + ' pickups requested';
        } else {
            durationText = 'Ending ' + this.props.request.duration.value;
        }
        durationText += ' for ' + repeatMap[this.props.request.repeats];

        return (
            <div className="backdrop">
                {/* TODO: fix background opacity. Maybe with iFrame. */}
                <div className="modal">
                    <div className="top-line"></div>
                    <p id="exit" onClick={this.props.onClose}>&times;</p>
                    <div className="summary-title flex">
                        <img src={truck} alt="truck"></img>
                        <p id="title">{this.props.title}</p>
                    </div>
                    <div className="wrapper grid">
                        <div className="details grid">
                            <p id="subheading">Pickup Details</p>
                            <p>Start Date: {this.props.dayOfWeek}, {this.props.request.startDate}</p>
                            <p>{durationText}</p>
                            <p>Pickup between {this.props.request.startTime} and {this.props.request.endTime}</p>
                        </div>
                        <div className="flex">
                            <div className="agency grid">
                                <p id="subheading">Dining Hall</p>
                                <p id="name">{this.props.donatingAgency.name}</p>
                                <div className="contact">
                                    <p>{this.props.primaryContact.name}</p>
                                    <p>{this.props.primaryContact.phone}</p>
                                    <p>{this.props.primaryContact.email}</p>
                                </div>
                            </div>
                            {/* concat address fields into a string */}
                            <Map 
                                address={this.props.address}
                                height={'150px'}
                                width={'350px'}
                                marginRight={'30px'}
                                marginTop={'0px'}
                                marginBottom={'0px'}
                                marginLeft={'10px'}
                            />
                        </div>
                        {this.props.raRequested && 
                            <div className="flex">
                                <div className="agency grid">
                                    <p id="subheading">Recipient Requested</p>
                                    <p id="name">{this.props.raRequested.name}</p>
                                    <div className="contact">
                                        <p>To be confirmed.</p>
                                    </div>
                                </div>
                                {/* TODO: Pass in address into map */}
                                <Map></Map>
                            </div>
                        }
                        {this.props.dgRequested && 
                            <div className="flex">
                                <div className="agency grid">
                                    <p id="subheading">Student Deliverer Requested</p>
                                    <p id="name">{this.props.dgRequested.name}</p>
                                    <div className="contact">
                                        <p>To be confirmed.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {this.props.request.notes !== '' ?
                            <div className="details grid">
                                <p id="subheading">Notes for Pickup</p>
                                <p>{this.props.request.notes}</p>
                            </div>
                            :
                            <br/>
                        }
                    
                        <div className="footer">
                            <input type="submit" value="Confirm" onClick={this.props.onConfirm}/> 
                            <input type="submit" value="Cancel" onClick={this.props.onClose}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PickupSummary;