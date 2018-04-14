const functions = require('firebase-functions');
const enums = require('../../Enums.js');
const utils = require('../../Utils.js');

const nt = enums.NotificationType;

/*
 * Listeners based on changes to recurring pickup requests:
 *
 * LISTENER 1: handle RA responses for recurring pickup requests
 * Cases:
 *  A) a RA claimed:
 *      Change: 'receivingAgency' changed from requested/pending to claimed
 *      Action: send notifications to DGs
 *  B) all RAs rejected:
 *      Change: 'status' changed from PENDING to REJECTED_RA
 *      Action: send notification back to DA
 *  C) no RA responded in time:
 *      TODO: to be handled by a different scheduled function
 *
 * Listener 2: handle DG responses for recurring pickup requests
 * TODO
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);
        // TODO remove debug logging
        console.debug(change.before.val());
        console.debug(change.after.val());

        // once a request is not in pending status, it shouldn't be changed anymore
        if (change.before.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Changes were made to a non-pending pickup request.'));
        }

        // get db refs. TODO: set up Admin SDK
        let requestSnap = change.after;
        let request = requestSnap.val();
        const rootRef = change.after.ref.parent.parent.parent;
        const accountsRef = rootRef.child('accounts');
        const daRef = rootRef.child(`donating_agencies/${request.donatingAgency}`);

        // ---------- Listener 1 triggers ----------
        // case A
        if (raClaimed(change)) {
            return sendRequestToDGs(accountsRef, requestSnap);
        }
        // case B
        if (raRejected(change)) {
            console.info('Listener1: all RA rejected -> send notification to DA');
            return utils.notifyRequestUpdate(
                'DA', daRef, requestSnap.key, nt.RECURRING_PICKUP_REJECTED_RA);
        }
        // ---------- Listener 1 end ----------

        // TODO: Listener 2

        console.info('Nothing was triggered.');
        return null;
    });

// ----------------------- Listener 1 funcs -----------------------
// case A trigger
function raClaimed(change) {
    return !change.before.child('receivingAgency').hasChild('claimed') && 
        change.after.child('receivingAgency').hasChild('claimed');
}

// case B trigger
function raRejected(change) {
    return change.before.val().status === enums.RequestStatus.PENDING &&
        change.after.val().status === enums.RequestStatus.REJECTED_RA;
}

// case A handler
function sendRequestToDGs(accountsRef, requestSnap) {
    let request = requestSnap.val();
    let dgInfo = request.delivererGroup;
    
    console.info('Listener1: a RA claimed -> send notifications to DGs');

    if (request.status !== enums.RequestStatus.PENDING) {
        return Promise.reject(
            new Error('Request should still have pending status when a RA claimed.'));
    }

    if (dgInfo.claimed) {
        return Promise.reject(
            new Error('DG shouldn\'t be confirmed upon request.'));
    }

    if (!dgInfo.requested && !dgInfo.pending) {
        return Promise.reject(new Error('No DGs in the request to notify.'));
    }

    let pending = [];
    if (dgInfo.requested) {
        pending.push(dgInfo.requested);
        console.info('A specific DG requested: ' + dgInfo.requested);
    } else {
        pending = dgInfo.pending;
        console.info('No specific DG requested, ' + pending.length + ' pending DGs');
    }

    let promises = [];
    for (let dg in pending) {
        let dgRef = accountsRef.child(pending[dg]);
        promises.push(
            utils.notifyRequestUpdate(
                'DG', dgRef, requestSnap.key, nt.RECURRING_PICKUP_REQUEST));
    }

    return Promise.all(promises);
}

// ----------------------- End Listener 1 -----------------------
