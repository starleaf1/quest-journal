import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlaceDetailWindowStateStore = defineStore(
  "placeDetailDisplay",
  () => {
    const infoWindowOpen = ref(false);
    const inspectedPlace = ref(null);

    const showInfoWindow = (setPlace) => {
      infoWindowOpen.value = true;
      inspectedPlace.value = setPlace;
    };

    const hideInfoWindow = () => {
      infoWindowOpen.value = false;
      inspectedPlace.value = null;
    };

    return {
      infoWindowOpen,
      inspectedPlace,
      showInfoWindow,
      hideInfoWindow,
    };
  }
);
