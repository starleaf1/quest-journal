import { db } from "@/plugins/firebase";
import { collection, deleteDoc, doc, GeoPoint, onSnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useSavedPlacesStore = defineStore('savedPlacesStore', () => {
  const authStore = useAuthStore()

  const savedPlaces = ref([])

  console.log('[saved-places-store] UID', authStore.uid)
  const colRef = collection(db, `userData/${authStore.uid}/places`)
  const unsubscribe = onSnapshot(colRef, colSnap => {
    savedPlaces.value = colSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })

  async function append({ place_id, geometry, icon, name, types, tags, notes }) {
    const toBeSaved = {
      place_id,
      name,
      types,
      tags,
      notes,
      geometry: {
        location: new GeoPoint(geometry.location.lat(), geometry.location.lng())
      },
      icon
    }

    console.log('[saved-places-store]', toBeSaved)
    const docRef = doc(colRef, toBeSaved.place_id)
    await setDoc(docRef, toBeSaved)
  }

  async function remove(placeId) {
    const docRef = doc(colRef, placeId)
    await deleteDoc(docRef)
  }

  return { savedPlaces, append, remove, unsubscribe }
})
