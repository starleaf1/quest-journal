import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStateStore = defineStore('mapStateStore', () => {
  const bounds = ref({})

  const setBounds = (e) => {
    bounds.value = e
  }

  return { bounds, setBounds }
})
