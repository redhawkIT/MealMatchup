import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MobileController from './MobileDelivery/MobileController';
import App from './App';
import DonatingAgencyMemberSignup from './SignUpIn/DonatingAgency/DonatingAgencyMemberSignup.js';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            {/* TODO: Mobile route 
                - unique path to a pickup and pass info into MobileDelivery
            */}
            <Route exact path="/mobile" component={MobileController} />
            {/* TODO: DA Member Signup route with agency key */}
            <Route exact 
                path="/signup/donatingagency/member" 
                component={DonatingAgencyMemberSignup} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
