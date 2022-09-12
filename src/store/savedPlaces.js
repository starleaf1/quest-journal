import { db } from "@/plugins/firebase";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useSavedPlacesStore = defineStore('savedPlacesStore', () => {
  const authStore = useAuthStore()

  const savedPlaces = ref([])

  const colRef = collection(db, `userData/${authStore.uid}/places`)
  const unsubscribe = onSnapshot(colRef, colSnap => {
    savedPlaces.value = colSnap.docs.map(({ id, data }) => ({ id, ...data() }))
  })

  async function append(place) {
    const docRef = doc(colRef, place.place_id)
    await setDoc(docRef, place)
  }

  async function remove(placeId) {
    const docRef = doc(colRef, placeId)
    await deleteDoc(docRef)
  }

  return { savedPlaces, append, remove, unsubscribe }
})
