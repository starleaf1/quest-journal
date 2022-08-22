<template>
  <fragment>
    <FormattedMarker
      v-for="place in places"
      :key="place.place_id"
      :place="place"
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
  components: { FormattedMarker }
}
</script>
