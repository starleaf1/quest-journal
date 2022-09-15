import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentCommunicator = defineStore('componentCommunicator', () => {
  const mapPanOrder = ref({})
  const orderMapPan = ({ lat, lng, zoom }) => {
    mapPanOrder.value = { ...mapPanOrder.value, lat, lng, zoom }
  }

  const placeMarkerCoordinates = ref({})
  const markPlace = ({ lat, lng }) => {
    placeMarkerCoordinates.value = { lat, lng }
  }

  return { orderMapPan, mapPanOrder, markPlace, placeMarkerCoordinates }
})