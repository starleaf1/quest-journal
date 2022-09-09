const functions = require('firebase-functions')
const { getFirestore } = require('firebase-admin/firestore')

const firestore = getFirestore()
const onUserSignUp = functions.auth.user().onCreate(user => {
  firestore.doc(`userData/${user.uid}`).set({ greeting: 'Hello, World!' })
})

module.exports = {
  onUserSignUp
}