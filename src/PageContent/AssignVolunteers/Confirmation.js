import React, { Component } from 'react';
import './Confirmation.css';
import ConfirmationCard from './ConfirmationCard';

class Confirmation extends Component {

    render() {

        return (

            <div className="confirmation-container">
                <ConfirmationCard 
                    studentGroup={this.props.studentGroup}
                    handleCloseClick={this.props.handleCloseClick}
                />
            </div>
        );

    }

}

export default Confirmation;