import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentCommunicator = defineStore('componentCommunicator', () => {
  const mapPanOrder = ref({})
  const orderMapPan = ({ lat, lng, zoom }) => {
    mapPanOrder.value = { ...mapPanOrder.value, lat, lng, zoom }
  }

  const placeMarkerCoordinates = ref({})
  const markedPlaceInfo = ref({})
  const markPlace = place => {
    if (!place) throw Error('Invalid place')
    markedPlaceInfo.value = place
    const lat = typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat
    const lng = typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng
    placeMarkerCoordinates.value = { lat, lng, zoom: 16 }
  }

  return { orderMapPan, mapPanOrder, markPlace, placeMarkerCoordinates, markedPlaceInfo }
})