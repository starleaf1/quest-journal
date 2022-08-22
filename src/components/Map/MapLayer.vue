<template>
  <l-map
    style="height: 100%; z-index: 0;"
    ref="primaryMap"
    @update:bounds="handleBoundsChange"
    :zoom="11"
    :center="center"
  >
    <l-tile-layer :url="tileUrl" />
    <BaseMarkers
      :places="places"
    />
  </l-map>
</template>

<script>
import { getPlacesInBounds } from "@/api/placesQueries"
import BaseMarkers from "./BaseMarkers.vue"
import _ from "lodash"

export default {
  name: "MapLayer",
  data() {
    return ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [-8.4537137, 114.5110415],
      places: []
    });
  },
  methods: {
    handleBoundsChange(e) {
      const appendPlaces = (newPlaces) => {
        if (!this.$data.places.length) {
          this.$data.places = newPlaces
          return
        }

        const placeFilter = newPlace => {
          console.debug('[place-filter] Checking if place exists', newPlace.place_id)
          return this.$data.places.some(existingPlace => existingPlace.place_id !== newPlace.place_id)
        }

        const unique = newPlaces.filter(placeFilter)
        this.$data.places = [...this.$data.places, ...unique]
      }
      const fetchPlaces = async () => {
        const places = await getPlacesInBounds(e);
        appendPlaces(places)
      }
      return _.debounce(fetchPlaces, 1000, { leading: true, trailing: false })()
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$refs.primaryMap.mapObject.invalidateSize();
    });
  },
  components: { BaseMarkers }
}
</script>
