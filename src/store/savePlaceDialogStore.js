import { defineStore } from "pinia"
import { ref } from "vue"

export const useSavePlaceDialogStore = defineStore('savePlaceDialogStore', () => {
  const isSaveDialogOpen = ref(false)

  const openSaveDialog = () => {
    isSaveDialogOpen.value = true
  }
  const closeSaveDialog = () => {
    isSaveDialogOpen.value = false
  }
  const placeId = ref('')

  return {
    isSaveDialogOpen,
    openSaveDialog,
    closeSaveDialog,
    placeId
  }
})
