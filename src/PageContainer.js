import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';
import { AccountType, PageContent, DeliveryType } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import EventCard from './PageContent/Calendar/EventCard.js';
import logo from './icons/temp-logo.svg';
import Directory from './PageContent/Directory/DirectoryPage.js';
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest.js';
import AssignVolunteersController from './PageContent/AssignVolunteers/AssignVolunteersController.js';

// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {
    constructor(props) {
        // Props: content, account
        super(props);

        this.state = {
            content: props.content,
            account: props.account,
            userId: props.userId,
            donatingAgency: null
        };

        this.navBarHandler = this.navBarHandler.bind(this);
    }

    componentDidMount() {
        // grab the DA entity if user is DA member
        if (
            this.props.account.accountType ===
            AccountType.DONATING_AGENCY_MEMBER
        ) {
            var daRef = firebase
                .database()
                .ref('donating_agencies')
                .child(this.props.account.agency);
            daRef.once('value').then(
                function(daSnap) {
                    this.setState({
                        donatingAgency: daSnap.val()
                    });
                }.bind(this)
            );
        }
    }

    navBarHandler(e) {
        this.setState({
            content: e
        });
    }

    render() {
        return (
            <div>
                <PageHeader logo={logo} title={this.props.account.name} />

                <NavBar
                    content={this.state.content}
                    accountType={this.props.account.accountType}
                    handler={this.navBarHandler}
                />

                {/* TODO: replace placeholder text with real components */}
                {this.state.content === PageContent.CALENDAR && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Calendar
                        <EventCard
                            eventType={DeliveryType.RECURRING}
                            startTime="10am"
                            endTime="12pm"
                            futureEvent={true}
                        />
                    </div>
                )}

                {this.state.content === PageContent.ASSIGN_VOLUNTEERS && (
                    <AssignVolunteersController />
                )}

                {this.state.content === PageContent.REQUEST_PICKUP &&
                    (this.state.donatingAgency ? (
                        /* Wait for donating agency to be fetched */
                        <RecurringPickupRequest
                            account={this.props.account}
                            donatingAgency={this.state.donatingAgency}
                        />
                    ) : (
                        /* TODO: add loading UI? */
                        <div />
                    ))}

                {this.state.content === PageContent.FOOD_LOGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Food Logs
                    </div>
                )}

                {this.state.content === PageContent.DIRECTORY &&
                    <Directory account={this.state.account} userId={this.state.userId}/>
                }

                {this.state.content === PageContent.SETTINGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Settings
                    </div>
                )}
            </div>
        );
    }
}
export default PageContainer;
