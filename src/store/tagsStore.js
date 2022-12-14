import { db } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useTagsStore = defineStore("tagsStore", () => {
  const authStore = useAuthStore();

  const tags = ref([]);

  const colRef = collection(db, `userData/${authStore.uid}/tags`);
  const unsubscribe = onSnapshot(colRef, (snapShot) => {
    tags.value = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  async function append({ name }) {
    await addDoc(colRef, { name });
  }
  async function edit(id, name) {
    console.log("[edit-tag]", { id, name });
    const docRef = doc(colRef, id);
    await setDoc(docRef, { name }, { merge: true });
  }
  async function remove(tagId) {
    await deleteDoc(doc(db, `userData/${authStore.uid}/tags/${tagId}`));
  }

  return { tags, unsubscribe, append, remove, edit };
});
