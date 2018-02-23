import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class StudentSignUp2 extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Account Details</label><br />
                    <input ref="email" type="text" id="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} /><br />
                    <input ref="password" type="password" id="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} />
                    <input type="password" id="confirm-password" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} />
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep}>CANCEL</span>
                    <span className="next" onClick={this.nextStep}>NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

        // Get values via this.refs
        var data = {
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default StudentSignUp2;