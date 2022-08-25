<template>
  <fragment>
    <BaseMarkers :places="places" />
  </fragment>
</template>

<script>
import { getPlacesInBounds } from '@/api/placesQueries';
import _ from "lodash"
import BaseMarkers from './BaseMarkers.vue';

export default {
  name: "MarkerGroup",
  components: { BaseMarkers },
  props: {
    bounds: {
      required: true
    }
  },
  data () {
    return ({
      places: []
    })
  },
  watch: {
    bounds(v) {
      this.handleBoundsChange(v)
    }
  },
  methods: {
    handleBoundsChange(e) {
      const appendPlaces = (newPlaces) => {
        if (!this.$data.places.length) {
          this.$data.places = newPlaces
          return
        }

        const placeFilter = newPlace => {
          const isUnique = existing.some(existingPlace => existingPlace.place_id !== newPlace.place_id)
          console.debug('[place-filter] Checking if place exists', newPlace.place_id, isUnique)
          return isUnique
        }

        const existing = _.cloneDeep(this.$data.places)
        if (existing.length >= 200) {
          existing.splice(0, newPlaces.length)
        }

        const unique = newPlaces.filter(placeFilter)
        this.$data.places = [...existing, ...unique]
      }

      const fetchPlaces = async () => {
        const places = await getPlacesInBounds(e);
        appendPlaces(places)
      }
      return _.debounce(fetchPlaces, 1000, { leading: true, trailing: false })()
    }
  }
}
</script>
