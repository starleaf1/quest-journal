<template>
  <l-marker
    :lat-lng="latLng"
    :icon="icon"
    @click="handleClick"
  />
</template>

<script>
import L from "leaflet"
import { mapActions } from 'pinia'
import { useComponentCommunicator } from '@/store/componentCommunicator'

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
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      })
    }
  },
  methods: {
    ...mapActions(useComponentCommunicator, ['clearMarkedPlace']),
    handleClick () {
      this.clearMarkedPlace()
      this.$emit('click', this.place)
    }
  }
}
</script>
