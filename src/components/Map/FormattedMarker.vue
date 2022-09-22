<template>
  <l-marker
    :latLng="latLng"
    :icon="computedIcon"
    @click="handleMarkerClick"
  />
</template>

<script>
import L from "leaflet"
export default {
  name: 'FormattedMarker',
  props: {
    place: {
      required: true
    },
    icon: Object
  },
  computed: {
    latLng () {
      return {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
    },
    computedIcon () {
      return L.icon({
        iconUrl: this.icon?.url ?? this.place.icon,
        iconSize: this.icon?.size ?? [10, 10]
      })
    }
  },
  methods: {
    handleMarkerClick() {
      this.$emit('click', this.place)
    }
  }
}
</script>
