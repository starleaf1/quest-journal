<template>
  <l-marker
    :latLng="latLng"
    :icon="icon"
  />
</template>

<script>
import L from "leaflet"
export default {
  name: 'FormattedMarker',
  props: {
    place: {
      required: true
    }
  },
  computed: {
    latLng () {
      return {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
    },
    icon () {
      return L.icon({
        iconUrl: this.place.icon,
        iconSize: [16, 16]
      })
    }
  }
}
</script>
