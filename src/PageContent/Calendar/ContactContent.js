import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import phone from '../../icons/phone.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        if (
            this.props.delivery.donatingAgency &&
            this.props.accountType === AccountType.DONATING_AGENCY_MEMBER
        ) {
            this.state = {
                edit: false,
                name: this.props.delivery.donatingAgency.contact.name,
                phone: this.props.delivery.donatingAgency.contact.phone,
                email: this.props.delivery.donatingAgency.contact.email
            };
        } else if (
            this.props.delivery.receivingAgency &&
            this.props.accountType === AccountType.RECEIVING_AGENCY
        ) {
            this.state = {
                edit: false,
                name: this.props.delivery.receivingAgency.contact.name,
                phone: this.props.delivery.receivingAgency.contact.phone,
                email: this.props.delivery.receivingAgency.contact.email
            };
        } else {
            this.state = {
                edit: false
            };
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
        // pass these in from firebase
        let values = {
            name: e.target.name.value,
            phone: e.target.phone.value
        };
        this.setState({
            name: e.target.name.value,
            phone: e.target.phone.value,
            edit: false
        });
    }

    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={phone} alt="volunteer" />
                <div className="content-wrapper content-wrapper-description">
                    {this.props.accountType === AccountType.RECEIVING_AGENCY ? (
                        <h1 className="section-header">
                            Primary Contact for Delivery
                        </h1>
                    ) : this.props.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER ? (
                            <h1 className="section-header">
                            Primary Contact Pick Up
                            </h1>
                        ) : null}
                    {!this.state.edit ? (
                        <div className="content-details-wrapper">
                            <p className="content-details contact-content">
                                {this.state.name} ({this.state.phone})
                            </p>
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form
                                className="edit-dg"
                                onSubmit={this.handleChange}
                            >
                                <div className="input-wrapper contact-wrapper">
                                    <input
                                        type="text"
                                        className="content-details "
                                        defaultValue={this.state.name}
                                        name="name"
                                    />
                                    <input
                                        type="tel"
                                        className="content-details "
                                        defaultValue={this.state.phone}
                                        name="phone"
                                        pattern={StringFormat.PHONE}
                                    />
                                    <input
                                        type="email"
                                        className="content-details "
                                        defaultValue={this.state.email}
                                        name="email"
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
                    {!this.state.edit && this.props.futureEvent ? (
                        <button
                            type="button"
                            className="edit-button"
                            onClick={this.edit}
                        >
                            Edit
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}
export default DescriptionContent;
