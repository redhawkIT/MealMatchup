import React, { Component } from 'react';
import { DeliveryType, AccountType } from '../../Enums';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }

    handleChange(id, value) {
        this.setState({
            '${id}': '${value}'
        });
    }

    render() {
        let buttonContent = '';
        let buttonClass = '';
        if (!this.state.edit) {
            buttonContent = 'edit';
            buttonClass = 'edit-button';
        } else {
            buttonContent = 'save';
            buttonClass = 'edit-button editing';
        }
        return (
            <div className="wrapper">
                <img className="content-icon" src={volunteer} alt="volunteer" />
                <div className="content-wrapper">
                    {this.props.accountType === AccountType.DELIVERER_GROUP ? (
                        <h1 className="section-header">Student Deliverers</h1>
                    ) : (
                        <h1 className="section-header">Picking Up Donation</h1>
                    )}
                    <h2 className="organization">
                        {this.props.delivererGroup}
                    </h2>
                    {!this.state.edit ? (
                        <div className="content-details-wrapper">
                            <p className="content-details">
                                {this.props.deliverer1} {this.props.phone1}
                            </p>
                            <p className="content-details">
                                {this.props.deliverer2} {this.props.phone2}
                            </p>
                        </div>
                    ) : (
                        <div className="content-details-wrapper inline-wrapper">
                            <input
                                className="content-details inline-details"
                                value={this.props.deliverer1}
                            />
                            <input
                                className="content-details inline-details"
                                value={this.props.phone1}
                                id="phone1"
                                onChange={e =>
                                    this.handleChange('phone1', e.target.value)
                                }
                            />
                            <input
                                className="content-details inline-details"
                                value={this.props.deliverer2}
                            />
                            <input
                                className="content-details inline-details"
                                value={this.props.phone2}
                            />
                        </div>
                    )}
                    {this.props.accountType === AccountType.DELIVERER_GROUP &&
                    this.props.futureEvent ? (
                            <button
                                className="edit-button"
                                type="button"
                                onClick={this.edit}
                            >
                                {buttonContent}
                            </button>
                        ) : null}
                </div>
            </div>
        );
    }
}
export default DelivererGroupContent;
