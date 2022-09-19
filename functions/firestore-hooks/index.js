const { getFirestore } = require('firebase-admin/firestore')
const functions = require('firebase-functions')

const renameCategory = functions.firestore.document('userData/{uid}/categories/{color}').onUpdate((change, context) => {
  const firestore = getFirestore()
  const newColor = change.after.data().category
  const oldColor = change.before.data().category
  
  const batchRename = firestore.batch()
  firestore.collection(`userData/${context.params.uid}/places`).get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        const currentColor = doc.data().category
        if (oldColor === currentColor) {
          batchRename.update(doc.ref, { ...doc.data(), category: newColor })
        }
      })
    })
    .then(() => batchRename.commit())
    .catch(e => {
      console.error('[update-category-names]', e)
    })
})

module.exports = { renameCategory }
