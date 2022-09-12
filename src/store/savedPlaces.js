import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/plugins/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useAuthStore } from "./authStore";

// export const useSavedPlacesStore = defineStore("savedPlaces", {
//   state: () => ({ savedPlaces: [] }),
//   actions: {
//     append(place) {
//       if (
//         this.savedPlaces.some(
//           (savedPlace) => savedPlace.place_id === place.place_id
//         )
//       ) {
//         this.remove(place.place_id);
//       }
//       this.savedPlaces.push(place);
//     },
//     remove(placeId) {
//       this.savedPlaces = this.savedPlaces.filter(
//         (savedPlace) => savedPlace.place_id !== placeId
//       );
//     },
//   },
//   persist: {
//     storage: sessionStorage,
//   },
// });

export const useSavedPlacesStore = defineStore("savedPlacesStore", () => {
  const savedPlaces = ref([]);
  const authStore = useAuthStore();
  const colRef = collection(db, `userData/${authStore.uid}/savedPlaces`);

  const unsubscribe = onSnapshot(colRef, (placesSnapshot) => {
    savedPlaces.value = placesSnapshot.docs.map(({ id, data }) => ({
      id,
      ...data(),
    }));
  });

  async function append(place) {
    const docRef = doc(colRef, place.place_id);
    await setDoc(docRef, place);
  }

  async function remove(place_id) {
    const docRef = doc(colRef, place_id);
    await deleteDoc(docRef);
  }

  return { append, remove, savedPlaces, unsubscribe };
});
