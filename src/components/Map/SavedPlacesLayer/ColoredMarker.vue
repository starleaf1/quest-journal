<template>
  <l-marker
    :lat-lng="latLng"
    :icon="icon"
  />
</template>

<script>
import L from "leaflet"

export default {
  name: 'ColoredMarker',
  props: {
    color: String,
    place: Object
  },
  computed: {
    latLng () {
      return this.place.geometry.location
    },
    icon () {
      return L.icon({
        iconUrl: require(`@/assets/markers/${this.color}.svg`),
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.place)
    }
  }
}
</script>
