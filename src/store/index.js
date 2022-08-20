import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export const useMiscStore = defineStore("misc", {
  state: () => ({ drawerOpen: false }),
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  },
});
