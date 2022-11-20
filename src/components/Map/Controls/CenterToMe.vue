<script>
import { useComponentCommunicator } from '@/store/componentCommunicator'
import { useGeolocationStore } from '@/store/geolocation'
import { computed, defineComponent } from 'vue'
import { LControl } from 'vue2-leaflet'

export default defineComponent({
  setup() {
    const geolocationStore = useGeolocationStore()
    const componentCommunicator = useComponentCommunicator()

    const coord = computed(() => geolocationStore.currentPos)

    const center = () => {
      componentCommunicator.orderMapPan({
        lat: coord.value.lat,
        lng: coord.value.lng,
        zoom: 14
      })
    }

    return {
      center
    }
  },
  components: {
    LControl
  }
})
</script>

<template>
  <l-control position="bottomright">
    <v-btn
      fab
      color="primary"
      dark
      @click="center"
    >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </l-control>
</template>
