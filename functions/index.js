require('./init')
const authHooks = require('./auth-hooks')
const firestoreHooks = require('./firestore-hooks')
const storageHooks = require('./storage-hooks')
const updaterScripts = require('./updater-scripts')

module.exports = {
    ...authHooks,
    ...firestoreHooks,
    ...storageHooks,
    ...updaterScripts
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
