const { getFirestore } = require('firebase-admin/firestore')
const functions = require('firebase-functions')

const normalizeSocialMedia = functions.https.onRequest(async (req, res) => {
  console.log('[normalize-social-media] Starting normalization...')
  const firestore = getFirestore()
  const documents = await firestore.collection('userData').listDocuments()
  
  documents.forEach(async doc => {
    const userDoc = await doc.get()
    if (!userDoc.exists) {
      console.log('[normalize-social-media]', `User ID ${userDoc.id} does not exist.`)
      return
    }
    const places = await doc.collection('places').listDocuments()
    places.forEach(async place => {
      const placeDoc = await place.get()
      if (!placeDoc.exists) {
        console.log('[normalize-social-media]', `Place ID ${placeDoc.id} does not exist.`)
        return
      }
      const placeData = placeDoc.data()
      if (placeData.socialMedia && !(placeData.socialMedia instanceof Array)) {
        console.log('[normalize-social-media]', `Place ID ${placeDoc.id}. Social media is not an array. Converting...`)
        try {
          place.set({ socialMedia: [placeData.socialMedia] }, { merge: true })
          console.log('[normalize-social-media]', `Successfully converted ${placeDoc.id}.`)
        } catch(e) {
          console.error('[normalize-social-media]', `Error when converting ${placeDoc.id}.`, e)
        }
      }
    })
  })

  res.end('Conversion initiated.')
})

module.exports = { normalizeSocialMedia }
