import { db } from "@/plugins/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useTagsStore = defineStore("tagsStore", () => {
  const authStore = useAuthStore();

  const tags = ref([]);

  const colRef = collection(db, `userData/${authStore.uid}/tags`);
  const unsubscribe = onSnapshot(colRef, (snapShot) => {
    tags.value = snapShot.docs.map(({ id, data }) => ({ id, ...data() }));
  });

  return { tags, unsubscribe };
});
