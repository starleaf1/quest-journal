const { getFirestore } = require('firebase-admin')
const functions = require('firebase-functions')
const { serverTimestamp } = require('firebase/firestore')

const registerPhotoInFirestore = functions.storage.object().onFinalize(async object => {
  if (!object.name.match(/^uploads\/.*\/images\/places\/.*/)) return
  if (!object.contentType.startsWith('image/')) throw new Error('Uploaded object is not image')
  const { name } = object
  const [, uid, , , placeId, ] = name.split('/')

  const firestore = getFirestore()
  try {
    await firestore.doc(`userData/${uid}/places/${placeId}/images`).set({
      uploaded: serverTimestamp(),
      gcsPath: name
    })
  } catch (e) {
    console.error('Failed to register in Firestore')
  }
})

module.exports = { registerPhotoInFirestore }
