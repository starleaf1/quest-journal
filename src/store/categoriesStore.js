import { db } from "@/plugins/firebase";
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const { uid } = useAuthStore()

  const categories = ref([])
  
  const colRef = collection(db, `userData/${uid}/categories`)

  const unsubscribe = onSnapshot(colRef, colSnap => {
    categories.value = colSnap.docs.map(({ id, data }) => ({ id, ...data() }))
  })

  const modify = async (id, v) => {
    const docRef = doc(colRef, id)
    await setDoc(docRef, v, { merge: true })
  }

  const add = async v => {
    await addDoc(colRef, v)
  }

  return { categories, unsubscribe, add, modify }
})
