import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeolocationStore = defineStore('GeolocationStore', () => {
  const watcher = ref()
  const currentPos = ref(null)

  const beginWatching = () => {
    watcher.value = navigator.geolocation.watchPosition(
      pos => {
        currentPos.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          hdg: pos.coords.heading,
          acc: pos.coords.accuracy
        }
      },
      e => {
        console.error('[geolocation]', e)
      },
      {
        enableHighAccuracy: true
      }
    )
  }

  return {
    watcher,
    currentPos,
    beginWatching
  }
})