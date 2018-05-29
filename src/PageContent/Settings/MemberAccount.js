import React, { Component } from 'react';

class MemberAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comingSoon: false,
        };
    }

    render() {

        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Member Accounts</h5>
                        
                    <div>

                        {this.props.members.map((element, index) => {
                            return (
                                <div key={index}>
                                    <div className="amd-row">
                                        <div className="amd-details amd-details-1">
                                            <div className="amd-details-child">
                                                <h6>{element.name}</h6>
                                                <h6>{element.position}</h6>
                                                <h6>{element.email}</h6>
                                                <h6>{element.phone}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    {/* TODO: implemement handleRemove */}
                                    {/* <button type="button" id={index} className="form-button confirm-button-assign settings-remove-button" onClick={this.handleRemove.bind(this)}>Remove</button> */}

                                </div>
                            );
                        })}


                    </div>

                    <div className="amd-edit amd-edit-1 amd-row">
                        <button type="button" className="form-button confirm-button" onClick={this.handleAdd.bind(this)}>{this.state.comingSoon ? 'Coming Soon...' : 'Add Member'}</button>
                    </div>

                </div>
            </div>
        );

    }

    // Backend TODO: Remove data from database here
    // For FRONTEND PURPOSES (UPDATING UI) MAYBE CHANGE WHILE WRITING BACKEND
    handleRemove(e) {
        let copy = this.props.members;
        copy.splice(e.target.id, 1);
        this.setState({
            state: copy
        });
    }

    handleAdd() {
        this.setState({
            comingSoon: true
        });
    }

}

export default MemberAccount;