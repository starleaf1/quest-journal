import { db } from "@/plugins/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useTagsStore = defineStore("tagsStore", () => {
  const authStore = useAuthStore()
  const tags = ref([])

  console.debug('[tags-store]', authStore.uid)

  const q = query(collection(db, `userData/${authStore.uid}/tags`))
  onSnapshot(q, qSnapshot => {
    tags.value = qSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
});
