// No log in functionality yet
import React, { Component } from 'react'

class SignIn extends Component {
    render() {
        return (
            <form>
                <div className="login-wrapper">
                    <div className="login-input-wrapper">
                        <input type="text" id="email" className="login-input form-component" placeholder="Email" /><br />
                        <input type="password" id="password" className="login-input form-component" placeholder="Password" /><br />
                    </div>
                    <div className="login-button-wrapper"><button type="button" className="login-button">Login</button></div>
                    <div className="forgot">
                        <p className="forgot">forgot password?</p>
                        <p className="forgot">forgot username?</p>
                    </div>
                </div>
            </form>
        )
    }
}
export default SignIn;