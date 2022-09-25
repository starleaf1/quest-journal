<template>
  <l-marker
    :lat-lng="latLng"
    @click="handleClick(place)"
  />
</template>

<script>
export default {
  name: 'PrimaryCoordinates',
  computed: {
    latLng () {
      const lat = typeof this.place.geometry.location.lat === 'function' ? this.place.geometry.location.lat() : this.place.geometry.location.lat
      const lng = typeof this.place.geometry.location.lng === 'function' ? this.place.geometry.location.lng() : this.place.geometry.location.lng
      return { lat, lng }
    }
  },
  props: {
    place: {
      required: true,
      type: Object
    }
  },
  methods: {
    handleClick (place) {
      this.$emit('click:marker', place)
    }
  }
}
</script>
