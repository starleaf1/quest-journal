const functions = require('firebase-functions')
const { getFirestore } = require('firebase-admin/firestore')
const { serverTimestamp } = require('firebase/firestore')

const firestore = getFirestore()
const onUserSignUp = functions.auth.user().onCreate(async user => {
  try {
    await Promise.all([
      firestore.doc(`userData/${user.uid}`).set({ registered: serverTimestamp() })
    ])
  } catch (e) {
    console.error('[on-user-signup-trigger]', e)
  }
})

module.exports = {
  onUserSignUp
}