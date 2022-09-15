import { db } from "@/plugins/firebase";
import { collection } from "firebase/firestore";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const { uid } = useAuthStore()

  const categories = ref([])
  
  const colRef = collection(db, `userData/${uid}/categories`)
})