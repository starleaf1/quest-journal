import { db } from "@/plugins/firebase";
import {
  collection,
  deleteDoc,
  doc,
  GeoPoint,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useSavedPlacesStore = defineStore("savedPlacesStore", () => {
  const authStore = useAuthStore();

  const savedPlaces = ref([]);
  const colRef = collection(db, `userData/${authStore.uid}/places`);
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
  }) {
    const toBeSaved = {
      place_id,
      formatted_address: formatted_address ?? null,
      name,
      ...(types?.length ? { types } : []),
      tags,
      notes,
      geometry: {
        location: new GeoPoint(
          typeof geometry.location.lat === 'function' ? geometry.location.lat() : geometry.location.lat,
          typeof geometry.location.lng === 'function' ? geometry.location.lng() : geometry.location.lng
        ),
      },
      icon: icon ?? null,
      ...(category ? { category } : null),
    };

    console.debug("[saved-places-store] Attempting to save", toBeSaved);

    const docRef = doc(colRef, toBeSaved.place_id);
    await setDoc(docRef, toBeSaved);
  }

  async function findById(id) {
    return savedPlaces.value.find((place) => place.place_id === id);
  }

  async function remove(placeId) {
    const docRef = doc(colRef, placeId);
    await deleteDoc(docRef);
  }

  return { savedPlaces, append, remove, unsubscribe, findById };
});
