<script>
import { defineComponent, computed } from 'vue'
import { useGeolocationStore } from '@/store/geolocation'
import L from 'leaflet'

export default defineComponent({
  setup() {
    const geolocationStore = useGeolocationStore()
    geolocationStore.beginWatching()

    const coord = computed(() => {
      return geolocationStore.currentPos
    })

    const iconUrl = require('@/assets/markers/current-location.svg')

    const icon = L.icon({
      iconUrl,
      iconSize: [50, 65],
      iconAnchor: [25, 65],
    })

    return {
      coord,
      icon
    }
  },
})
</script>

<template>
  <l-layer-group>
    <l-marker v-if="coord?.lat && coord?.lng" :lat-lng="{ ...coord }" :icon="icon" />
  </l-layer-group>
</template>
