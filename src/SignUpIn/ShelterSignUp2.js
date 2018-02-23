import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class ShelterSignUp2 extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Account Details</label><br />
                    <input ref="email"type="text" id="organization" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} /><br />
                    <input ref="password" type="password" id="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} />
                    <input type="password" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} />
                </div>
                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.props.nextStep}>DONE</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()
        console.log(this);
        console.log(this.refs);
        // Get values via this.refs
        var data = {
            organizationName: ReactDOM.findDOMNode(this.refs.organizationName).value,
            numVolunteers: ReactDOM.findDOMNode(this.refs.numVolunteers).value,
            contactName: ReactDOM.findDOMNode(this.refs.contactName).value,
            contactEmail: ReactDOM.findDOMNode(this.refs.contactEmail).value,
            contactNumber: ReactDOM.findDOMNode(this.refs.contactNumber).value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default ShelterSignUp2;