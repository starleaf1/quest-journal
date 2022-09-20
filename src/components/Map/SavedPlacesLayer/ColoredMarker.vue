<template>
  <l-marker
    :lat-lng="latLng"
  />
</template>

<script>
import L from "leaflet"

export default {
  name: 'ColoredMarker',
  props: {
    color: String
  },
  computed: {
    icon () {
      return L.icon({
        iconUrl: require(`@/assets/markers/${this.color}.svg`),
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }
  }
}
</script>
