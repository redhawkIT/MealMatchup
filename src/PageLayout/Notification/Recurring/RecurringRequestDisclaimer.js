import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import PickupDetails from '../../../PageContent/Summary/PickupDetails';

class RecurringRequestDisclaimer extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1>Are you sure you want to claim this pickup?</h1>
                    <h2 className="warning">Once a pickup is claimed it cannot be cancelled.</h2>
                    <p><span className="to-from">From:</span> Local Point  </p><span className="to-from">To:</span> Seattle Union Gospel Mission <br/>
                    <div className="pickup-details">
                        <PickupDetails request={this.props.details} />
                    </div>
                    <div className="popup-buttons">
                        <button onClick={this.props.nextStep} className="claim" type="button">Confirm</button> <button onClick={this.props.close} className="reject" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        );
    } 
}
export default RecurringRequestDisclaimer;