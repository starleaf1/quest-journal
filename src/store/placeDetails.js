import { defineStore } from "pinia";
import _ from "lodash";
import { getPlaceDetails } from "@/api/placesQueries";

export const usePlaceDetailsStore = defineStore("placeDetailsCache", {
  state: () => ({
    places: [],
  }),
  actions: {
    async getDetailsById(id, fresh = 7 * 24 * 3600 * 1000) {
      const now = new Date();
      const detailsFromCache = this.places.find(
        (place) =>
          place.place_id === id && detailsFromCache.fetchedAt - now <= fresh
      );
      if (detailsFromCache) {
        console.log(
          "[place-details] Fresh cache exist. Returning...",
          detailsFromCache
        );
        return detailsFromCache;
      }
      console.log(
        "[place-details] No match in cache. Requesting from Places API..."
      );
      const detailsFromGoogle = await getPlaceDetails(id);
      this.append({ ...detailsFromGoogle, fetchedAt: now });
      return { ...detailsFromGoogle, fetchedAt: now };
    },
    append(place) {
      this.places.push(place);
    },
    remove(placeId) {
      const targetIndex = this.places.findIndex(
        (place) => place.place_id === placeId
      );
      const clone = _.clone(this.places);
      clone.splice(targetIndex, 1);
      this.places = clone;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
