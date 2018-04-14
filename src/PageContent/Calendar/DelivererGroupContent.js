import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        if (
            this.props.delivery !== undefined &&
            this.props.delivery.deliveryGroup !== undefined
        ) {
            this.state = {
                edit: false,
                delivererGroup: this.props.delivery.delivererGroup.name,
                deliverer1: this.props.delivery.delivererGroup.deliverers[0]
                    .name,
                deliverer2: this.props.delivery.delivererGroup.deliverers[1]
                    .name,
                phone1: this.props.delivery.delivererGroup.deliverers[0].phone,
                phone2: this.props.delivery.delivererGroup.deliverers[1].phone,
                email1: this.props.delivery.delivererGroup.deliverers[0].email,
                email2: this.props.delivery.delivererGroup.deliverers[1].email
            };
        } else {
            this.state = {};
        }

        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            edit: false,
            deliverer1: e.target.deliverer1.value,
            phone1: e.target.phone1.value,
            deliverer2: e.target.deliverer2.value,
            phone2: e.target.phone2.value
        });

        // TODO: Save values to firebase
    }

    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={volunteer} alt="volunteer" />
                <div className="content-wrapper">
                    {this.props.accountType === AccountType.DELIVERER_GROUP ? (
                        <h1 className="section-header">Student Deliverers</h1>
                    ) : (
                        <h1 className="section-header">Picking Up Donation</h1>
                    )}

                    {!this.state.delivererGroup ? (
                        <div className="tbd">To Be Determined.</div>
                    ) : (
                        <div>
                            <h2 className="organization">
                                {this.state.delivererGroup}
                            </h2>
                            {!this.state.edit ? (
                                <div className="content-details-wrapper">
                                    <p className="content-details">
                                        {this.state.deliverer1} ({
                                            this.state.phone1
                                        })
                                    </p>
                                    <p className="content-details">
                                        {this.state.deliverer2} ({
                                            this.state.phone2
                                        })
                                    </p>
                                </div>
                            ) : (
                                <div className="content-details-wrapper">
                                    <form
                                        className="edit-dg"
                                        onSubmit={this.handleChange}
                                    >
                                        <div className="input-wrapper">
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={
                                                    this.state.deliverer1
                                                }
                                                name="deliverer1"
                                                type="text "
                                                required
                                            />
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={this.state.phone1}
                                                name="phone1"
                                                type="tel"
                                                pattern={StringFormat.PHONE}
                                                required
                                            />
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={this.state.email1}
                                                type="email"
                                                required
                                            />
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={
                                                    this.state.deliverer2
                                                }
                                                type="text"
                                                name="deliverer2"
                                                required
                                            />
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={this.state.phone2}
                                                type="tel"
                                                name="phone2"
                                                pattern={StringFormat.PHONE}
                                                required
                                            />
                                            <input
                                                className="content-details deliverer-group-details"
                                                defaultValue={this.state.email2}
                                                type="email"
                                                required
                                            />
                                        </div>

                                        <input
                                            type="submit"
                                            className="edit-button"
                                            value="save"
                                        />
                                    </form>
                                </div>
                            )}
                            {this.props.accountType ===
                                AccountType.DELIVERER_GROUP &&
                            !this.state.edit &&
                            this.props.futureEvent ? (
                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={this.edit}
                                    >
                                    Edit
                                    </button>
                                ) : null}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default DelivererGroupContent;
