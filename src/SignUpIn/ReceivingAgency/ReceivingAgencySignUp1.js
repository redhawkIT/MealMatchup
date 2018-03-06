import React, { Component } from 'react';

class ReceivingAgencySignUp1 extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component">Organization Details</label><br />
                        <input name="organizationName"type="text" id="organization" className="form-component" placeholder="Organization Name" defaultValue={this.props.fieldValues.organizationName} /><br />
                        <input name="address1" type="text" id="address1" className="form-component" placeholder="Street Address 1" defaultValue={this.props.fieldValues.address1} />
                        <input name="address2" type="text" id="address2" className="form-component" placeholder="Street Address 2 (optional)" defaultValue={this.props.fieldValues.address2} />
                        <input name="city" type="text" id="city" className="form-component" placeholder="City" defaultValue={this.props.fieldValues.city} />
                        <span className="side-by-side-wrapper">
                            <select name="state" type="text" className="form-component side-by-side" placeholder="State" defaultValue={this.props.fieldValues.state}>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">New Hampshire</option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">North Carolina</option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
                            </select>
                            <input name="zip" type="text" id="zip" className="form-component" placeholder="Zip Code" defaultValue={this.props.fieldValues.zip}/>
                        </span>
                        <input name="officeNumber" type="text" id="office-number" className="form-component" placeholder="Office Number" defaultValue={this.props.fieldValues.officeNumber}/>
                    </div>

                    <div className="disclaimer">
                    All fields are required unless specified
                    </div>
                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                        <input type="submit" className="next" value="NEXT"/>
                    </div>
                </div>
            </form>
        );
    }
    nextStep(e) {
        e.preventDefault();
        var data = {
            organizationName: e.target.organizationName.value,
            address1: e.target.address1.value,
            address2: e.target.address2.value,
            city: e.target.city.value,
            state: e.target.state.value,
            officeNumber: e.target.officeNumber.value
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp1;