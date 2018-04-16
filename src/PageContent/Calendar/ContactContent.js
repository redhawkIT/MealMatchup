import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import phone from '../../icons/phone.svg';

class ContactContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            contact: {},
            memberList: []
        };
        if (this.props.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            this.state = {
                contact: {
                    name: this.props.delivery.donatingAgency.contact.name,
                    phone: this.props.delivery.donatingAgency.contact.phone,
                    memberList: this.props.delivery.donatingAgency.contact
                        .memberList
                }
            };
        } else if (this.props.accountType === AccountType.RECEIVING_AGENCY) {
            this.state = {
                contact: {
                    name: this.props.delivery.receivingAgency.contact.name,
                    phone: this.props.delivery.receivingAgency.contact.phone
                }
            };
        }

        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDA = this.handleChangeDA.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            contact: {
                name: e.target.name.value,
                phone: e.target.phone.value,
                edit: false
            }
        });
    }

    handleChangeDA(e) {
        e.preventDefault();
        let index = e.target.primaryContact.value;
        let memberName = this.state.contact.memberList[index].name;
        let memberPhone = this.state.contact.memberList[index].phone;
        let memberList = this.state.contact.memberList;
        this.setState({
            contact: {
                name: memberName,
                phone: memberPhone,
                memberList: memberList
            },
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
                            Primary Contact for Pick Up
                            </h1>
                        ) : null}
                    {!this.state.edit ? (
                        <div>
                            {!this.state.name ? (
                                <div className="content-details-wrapper">
                                    <p className="content-details contact-content">
                                        {this.state.contact.name} ({
                                            this.state.contact.phone
                                        })
                                    </p>
                                </div>
                            ) : (
                                <div className="content-details-wrapper">
                                    <p className="content-details contact-content">
                                        {this.state.contact.name} ({
                                            this.state.contact.phone
                                        })
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : this.props.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER ? (
                            <div>
                                <form onSubmit={this.handleChangeDA}>
                                    <select
                                        name="primaryContact"
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>
                                        Select
                                        </option>
                                        {this.state.contact.memberList.map(
                                            (member, i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {member.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <input
                                        type="submit"
                                        value="save"
                                        className="edit-button"
                                    />
                                </form>
                            </div>
                        ) : this.props.accountType ===
                    AccountType.RECEIVING_AGENCY ? (
                                <div className="content-details-wrapper">
                                    <form
                                        className="edit-dg"
                                        onSubmit={this.handleChange}
                                    >
                                        <div className="input-wrapper contact-wrapper">
                                            <input
                                                type="text"
                                                className="content-details "
                                                defaultValue={this.state.contact.name}
                                                name="name"
                                            />
                                            <input
                                                type="tel"
                                                className="content-details "
                                                defaultValue={this.state.contact.phone}
                                                name="phone"
                                                pattern={StringFormat.PHONE}
                                            />
                                            <input
                                                type="email"
                                                className="content-details "
                                                defaultValue={this.state.contact.email}
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
                            ) : null}
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
export default ContactContent;
