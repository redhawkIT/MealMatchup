import '../SignUpIn.css';
import firebase from '../../FirebaseConfig';
import DonatingAgencySignUp from './DonatingAgencySignUp';
import DonatingAgencySignUp1 from './DonatingAgencySignUp1';
import DonatingAgencySignUp2 from './DonatingAgencySignUp2';
import DonatingAgencySignUp3 from './DonatingAgencySignUp3';
import SignUpComplete from '../SignUpComplete';

let React = require('react');
let createReactClass = require('create-react-class');

let fieldValues = {
    organizationName: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    officeNumber: null,
   
    email: null,
    password: null,
    adminName: null,
    adminPosition: null,
    adminEmail: null,
    adminPhone: null,
    adminPassword: null,

    memberName: null,
    memberPosition: null,
    memberEmail: null,
    memberPhone: null,
    memberPassword: null,
    
}

let DonatingAgencySignUpController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    saveValues: function (fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }()
    },

    nextStep: function () {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function () {
        this.setState({
            step: this.state.step - 1
        })
    },

    submitRegistration: function () {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        this.nextStep()
    },

    showStep: function () {
        switch (this.state.step) {
            case 0:
                return <DonatingAgencySignUp
                    nextStep={this.nextStep} />
            case 1:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                    </div>
                    <DonatingAgencySignUp1 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} />
                </div>

            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div><div className="circle open"></div>
                    </div>
                    <DonatingAgencySignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>

            case 3:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                    </div>
                    <DonatingAgencySignUp3 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>
            default:
                return <SignUpComplete />
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">
                {console.log(this.state.step)}
                {this.showStep()}
            </div>
        )
    }
})
export default DonatingAgencySignUpController;