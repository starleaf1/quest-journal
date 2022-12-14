import { db } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { useSavedPlacesStore } from "./savedPlaces";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categoriesStore", () => {
  const authStore = useAuthStore();
  const uid = authStore.uid;

  const savedPlacesStore = useSavedPlacesStore();

  const categories = ref([]);

  const colRef = collection(db, `userData/${uid}/categories`);

  const unsubscribe = onSnapshot(colRef, (colSnap) => {
    categories.value = colSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });

  const modify = async (id, v) => {
    const docRef = doc(colRef, id);
    await setDoc(docRef, v, { merge: true });
  };

  const add = async (v) => {
    await addDoc(colRef, v);
  };

  const findAllMembers = (keyword) => {
    const savedPlaces = savedPlacesStore.savedPlaces;
    const members = savedPlaces.filter((place) => {
      if (keyword === null) {
        return place.category === undefined || place.category === null
      }
      return place.category === keyword
    })
    return members
  };

  const categoriesInFilter = ref([])
  const setCategoryFilter = (items) => {
    categoriesInFilter.value = items
  }

  return {
    categories,
    unsubscribe,
    add,
    modify,
    findAllMembers,
    categoriesInFilter,
    setCategoryFilter
  };
});
