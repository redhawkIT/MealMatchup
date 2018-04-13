// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!   AUTO GENERATED FROM src/Enums.js, DO NOT MODIFY   !!
// !!   Please modify src/Enums.js instead and run:       !!
// !!             `python hacks/cp_enums.py`              !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Disable undeclared variable check on 'exports'
/*global exports:true*/
/*eslint no-undef: "error"*/

exports.DateTimeFormat = {
    DATE: 'YYYY-MM-DD',  // '2018-03-24'
    TIME: 'HH:mm',  // '15:30' (24hr)
};

exports.AccountType = {
    UMBRELLA: 'umbrella',
    DONATING_AGENCY_MEMBER: 'donating_agency_member',
    RECEIVING_AGENCY : 'receiving_agency',
    DELIVERER_GROUP: 'deliverer_group'
};

// For now (as of 3/5/2018), the only umbrella
// account type is school (eg UW). In the future,
// there could be other types such as corporate.
exports.UmbrellaType = {
    SCHOOL: 'school',
};

exports.PageContent = {
    ASSIGN_VOLUNTEERS: 'Assign Volunteers',
    CALENDAR: 'Calendar',
    DIRECTORY: 'Directory',
    FOOD_LOGS: 'Food Logs',
    REQUEST_PICKUP: 'Request Pickup',
    SETTINGS: 'Settings'
};

exports.RequestDurationType = {
    DATE: 'date',  // an end date
    RECUR: 'num_recurrences'  // number of recurrences
};

exports.RequestRepeatType = {
    WEEKLY: 'weekly',
    BIWEEKLY: 'biweekly', // every other week
    MONTHLY: 'monthly',
    // TODO Nth weekday of month
};

exports.RequestStatus = {
    // waiting on RA/DG response
    PENDING: 'pending',
    // claimed by all parties
    CONFIRMED: 'confirmed',
    // failed due to no RA claimed within deadline
    EXPIRED_RA: 'expired_ra',
    // failed due to no DG claimed within deadline
    EXPIRED_DG: 'expired_dg',
    // failed due to all RAs rejected
    REJECTED_RA: 'rejected_ra',
    // failed due to all DGs rejected
    REJECTED_DG: 'rejected_dg',
    // failed due to no available RAs
    UNAVAILABLE: 'unavailable',
};

exports.NotificationType = {
    /* When: a new DA/RA/DG account is created
       Receiver: School
       Actions: View */
    NEW_ACCOUNT: 'new_account',
    /* When: a DA requests a new recurring pick
       Receiver: RA, DG
       Action: View -> Claim/Reject */
    RECURRING_PICKUP_REQUEST: 'recurring_pickup_request',
    /* When: a recurring pick has been claimed by both RA and DG
       Receiver: DA
       Action: View -> View on Calendar */
    RECURRING_PICKUP_CONFIRMED: 'recurring_pickup_confirmed',
    /* When: no RA claims the pickup request within the deadline
       Receiver: DA
       Action: View? */
    RECURRING_PICKUP_EXPIRED_RA: 'recurring_pickup_expired_ra',
    /* When: no DG claims the pickup request within the deadline
       Receiver: DA
       Action: View? */
    RECURRING_PICKUP_EXPIRED_DG: 'recurring_pickup_expired_dg',
    /* When: all RAs rejected the pickup request
       Receiver: DA
       Action: View? */
    RECURRING_PICKUP_REJECTED_RA: 'recurring_pickup_rejected_ra',
    /* When: all DGs rejected the pickup request
       Receiver: DA
       Action: View? */
    RECURRING_PICKUP_REJECTED_DG: 'recurring_pickup_rejected_dg',
    /* When: no available RAs to send to
       Receiver: DA
       Action: View? */
    RECURRING_PICKUP_UNAVAILABLE: 'recurring_pickup_unavailable',
};