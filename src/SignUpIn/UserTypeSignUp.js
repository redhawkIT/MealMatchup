import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import volunteer from '../icons/volunteer.svg';
import shelter from '../icons/shelter.svg';
import vitamins from '../icons/vitamins.svg';

class UserTypeSignUp extends Component {
    constructor(props) {
        super(props);
        this.showDelivererGroup = this.showDelivererGroup.bind(this);
        this.showDonatingAgency = this.showDonatingAgency.bind(this);
        this.showReceivingAgency = this.showReceivingAgency.bind(this);
    }
    render() {
        return (
            <div className="user-type-wrapper">
                <div className="user-type-box">
                    <div className="user-type-label">SELECT ACCOUNT TYPE</div>
                    <div
                        onClick={this.showDelivererGroup}
                        className="user-type"
                    >
                        <img
                            alt="icon"
                            type="image/svg+xml"
                            src={volunteer}
                            className="user-icon"
                        />{' '}
                        Student Group
                    </div>
                    <div
                        onClick={this.showReceivingAgency}
                        className="user-type"
                    >
                        <img
                            alt="icon"
                            type="image/svg+xml"
                            src={shelter}
                            className="user-icon"
                        />{' '}
                        Receiving Agency
                    </div>
                    <div
                        onClick={this.showDonatingAgency}
                        className="user-type"
                    >
                        <img
                            alt="icon"
                            type="image/svg+xml"
                            src={vitamins}
                            className="user-icon"
                        />{' '}
                        Donating Agency
                    </div>
                    {/* TODO add routing to Login */}
                    {/* <div className="user-type login-reroute">
                        <Link to={'/login'}>Login</Link>
                    </div> */}
                    <a className="temp-link" href={' '}>
                        <div className="user-type login-reroute">Back</div>
                    </a>
                </div>
            </div>
        );
    }
    showDelivererGroup(e) {
        e.preventDefault();
        this.props.showDelivererGroup();
    }
    showReceivingAgency(e) {
        e.preventDefault();
        this.props.showReceivingAgency();
    }
    showDonatingAgency(e) {
        e.preventDefault();
        this.props.showDonatingAgency();
    }
}
export default UserTypeSignUp;
