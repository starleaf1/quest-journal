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
import FormattedMarker from './FormattedMarker.vue'
import { mapActions } from 'pinia'
import { useComponentCommunicator } from '@/store/componentCommunicator'

export default {
  name: "BaseMarkers",
  props: {
    places: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions(useComponentCommunicator, ['clearMarkedPlace']),
    handleClick(place) {
      this.clearMarkedPlace()
      this.$emit('click:marker', place)
    }
  },
  components: { FormattedMarker }
}
</script>
