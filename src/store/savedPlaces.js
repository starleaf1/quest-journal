import { db } from "@/plugins/firebase";
import {
  collection,
  deleteDoc,
  doc,
  GeoPoint,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useSavedPlacesStore = defineStore("savedPlacesStore", () => {
  const authStore = useAuthStore();

  const colRef = collection(db, `userData/${authStore.uid}/places`);

  const savedPlaces = ref([]);
  const unsubscribe = onSnapshot(colRef, (colSnap) => {
    savedPlaces.value = colSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      ...{
        geometry: {
          location: {
            lat: doc.data()?.geometry?.location?.latitude,
            lng: doc.data()?.geometry?.location?.longitude,
          },
        },
      },
    }));
  });

  async function patch(placeId, data) {
    const docRef = doc(colRef, placeId)
    await updateDoc(docRef, data)
  }

  async function append({
    place_id,
    geometry,
    icon,
    name,
    types,
    tags,
    notes,
    formatted_address,
    category,
    socialMedia,
    updatedAt
  }) {
    const toBeSaved = {
      place_id,
      formatted_address: formatted_address ?? null,
      name,
      ...(types?.length ? { types } : []),
      tags,
      updatedAt,
      notes,
      geometry: {
        location: new GeoPoint(
          typeof geometry.location.lat === "function"
            ? geometry.location.lat()
            : geometry.location.lat,
          typeof geometry.location.lng === "function"
            ? geometry.location.lng()
            : geometry.location.lng
        ),
      },
      icon: icon ?? null,
      category: category ?? null,
      socialMedia
    };

    console.debug("[saved-places-store] Attempting to save", toBeSaved);

    const docRef = doc(colRef, toBeSaved.place_id);
    await setDoc(docRef, toBeSaved);
  }

  function findById(id) {
    return savedPlaces.value.find((place) => place.place_id === id);
  }

  async function remove(placeId) {
    const docRef = doc(colRef, placeId);
    await deleteDoc(docRef);
  }

  return { savedPlaces, append, remove, unsubscribe, findById, patch };
});
