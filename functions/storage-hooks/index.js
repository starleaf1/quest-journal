const { getFirestore } = require('firebase-admin/firestore')
const functions = require('firebase-functions')

const registerPhotoInFirestore = functions.storage.object().onFinalize(async object => {
  if (!object.name.match(/^uploads\/.*\/images\/places\/.*/)) return
  if (!object.contentType.startsWith('image/')) throw new Error('Uploaded object is not image')
  const { name } = object
  const [, uid, , , placeId, ] = name.split('/')

  const firestore = getFirestore()
  await firestore.collection(`userData/${uid}/places/${placeId}/images`).add({
    uploaded: new Date(),
    gcsPath: name
  })
})

module.exports = { registerPhotoInFirestore }
