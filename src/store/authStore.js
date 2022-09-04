import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isFetchingAuth: true,
    isAuthenticated: false,
    user: null,
    originalDestination: null,
  }),
  getters: {
    uid: (state) => state.user?.uid,
  },
  actions: {
    storeAuthData(userData) {
      this.isAuthenticated = true;
      this.user = userData;
      this.isFetchingAuth = false;
    },
    clearAuthData() {
      this.isAuthenticated = false;
      this.user = null;
      this.isFetchingAuth = false;
    },
    clearOriginalDestination () {
      this.originalDestination = null
    }
  },
  persist: {
    storage: sessionStorage,
  },
});
