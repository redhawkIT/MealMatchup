import React, {Component} from 'react';
import { PageContent } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg';
import RecurringPickup from './PageContent/RequestPickup/RecurringPickupRequest.js';

import Directory from './PageContent/Directory/DirectoryPage.js';
// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: props.content,
            account: props.account,
            userId: props.userId
        };
        
        this.navBarHandler = this.navBarHandler.bind(this);
    }

    navBarHandler(e) {
        this.setState({
            content: e
        });
    }
 
    render(){
        return(
            <div>
                {/* <header > */}
                <PageHeader logo={logo} title={this.props.account.name}></PageHeader>
                {/* </header> */}
                <NavBar content={this.state.content} accountType={this.props.account.accountType} handler={this.navBarHandler}></NavBar>

                {/* TODO: replace placeholder text with real components */}
                {this.state.content === PageContent.CALENDAR &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Calendar</div>
                }
                {this.state.content === PageContent.ASSIGN_VOLUNTEERS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Assign Volunteers</div>
                }
                {this.state.content === PageContent.REQUEST_PICKUP &&
                    <RecurringPickup account={this.state.account}></RecurringPickup>
                }
                {this.state.content === PageContent.FOOD_LOGS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Food Logs</div>
                }
                {this.state.content === PageContent.DIRECTORY &&
                    <Directory account={this.state.account} userId={this.state.userId}/>
                }
                {this.state.content === PageContent.SETTINGS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Settings</div>
                }
            </div>
        );
    }
}
export default PageContainer;
