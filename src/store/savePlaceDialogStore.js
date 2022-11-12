import { defineStore } from "pinia";
import { ref } from "vue";

export const useSavePlaceDialogStore = defineStore(
  "savePlaceDialogStore",
  () => {
    const isSaveDialogOpen = ref(false);
    const placeId = ref("");

    const openSaveDialog = (id) => {
      isSaveDialogOpen.value = true;
      placeId.value = id;
    };
    const closeSaveDialog = () => {
      isSaveDialogOpen.value = false;
    };

    return {
      isSaveDialogOpen,
      openSaveDialog,
      closeSaveDialog,
      placeId,
    };
  }
);
