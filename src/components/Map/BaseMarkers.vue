<template>
  <fragment>
    <FormattedMarker
      v-for="place in places"
      :key="place.place_id"
      :place="place"
      @click="handleClick"
    />
  </fragment>
</template>

<script>
import FormattedMarker from './FormattedMarker.vue';
export default {
  name: "BaseMarkers",
  props: {
    places: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(place) {
      this.$emit('click:marker', place)
    }
  },
  components: { FormattedMarker }
}
</script>
