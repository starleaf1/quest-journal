import { defineStore } from "pinia";

export const useSavedPlacesStore = defineStore("savedPlaces", {
  state: () => ({ savedPlaces: [] }),
  actions: {
    append(place) {
      if (
        this.savedPlaces.some(
          (savedPlace) => savedPlace.place_id === place.place_id
        )
      ) {
        this.remove(place.place_id);
      }
      this.savedPlaces.push(place);
    },
    remove(placeId) {
      this.savedPlaces = this.savedPlaces.filter(
        (savedPlace) => savedPlace.place_id !== placeId
      );
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
