import { defineStore } from "pinia";

export const authStore = defineStore("counter", {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  getters: {
    uid: (state) => state.user?.uid,
  },
  actions: {
    storeAuthData(userData) {
      this.isAuthenticated = true;
      this.user = userData;
    },
  },
});
