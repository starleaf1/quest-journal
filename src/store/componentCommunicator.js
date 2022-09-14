import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentCommunicator = defineStore('componentCommunicator', () => {
  const mapPanOrder = ref({
    lat: 0,
    lng: 0,
    zoom: 0
  })

  const orderMapPan = ({ lat, lng, zoom }) => {
    mapPanOrder.value = { ...mapPanOrder.value, lat, lng, zoom }
  }

  return { orderMapPan, mapPanOrder }
})