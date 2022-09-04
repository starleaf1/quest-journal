import { defineStore } from "pinia";

export const useToastStore = defineStore('toastStore', {
  state: () => ({
    toast: null
  }),
  actions: {
    setToast (message, color, timeout) {
      this.toast = {
        message, color, timeout
      }
    },
    clearToast () {
      this.toast = null
    }
  }
})