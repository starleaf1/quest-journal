<template>
  <l-map
    style="height: 100%; z-index: 0;"
    ref="primaryMap"
    @update:bounds="handleBoundsChange"
    @contextmenu="handleContextClick"
    :zoom="11"
    :center="center"
  >
    <l-tile-layer :url="tileUrl" />
    <MarkerGroup
      :bounds="bounds"
      @click:marker="showInfoWindow"
    />
    <InfoWindow
      :place="inspectedPlace"
      :open="infoWindowOpen"
      @click:outside="hideInfoWindow"
    />
  </l-map>
</template>

<script>
import { mapState } from 'pinia'
import { useSavedPlacesStore } from '@/store/savedPlaces'
import InfoWindow from "./InfoWindow"
import MarkerGroup from "./MarkerGroup.vue"
import { v4 as uuid } from 'uuid'

export default {
  name: "MapLayer",
  computed: {
    savedPlaces: {
      ...mapState(useSavedPlacesStore, ['savedPlaces'])
    },
  },
  data() {
    return ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [-8.4537137, 114.5110415],
      places: [],
      inspectedPlace: null,
      infoWindowOpen: false,
      bounds: null
    });
  },
  methods: {
    handleBoundsChange (e) {
      this.$data.bounds = e
    },
    showInfoWindow(place) {
      this.$data.inspectedPlace = place
      this.$data.infoWindowOpen = true
    },
    handleContextClick(e) {
      const { latlng: location } = e
      const name = `${Math.abs(location.lat)}${location.lat >= 0 ? 'N' : 'S'}, ${Math.abs(location.lng)}${location.lng >= 0 ? 'E' : 'W'}`
      const place_id = uuid()
      this.showInfoWindow({
        place_id,
        location,
        name
      })
    },
    hideInfoWindow() {
      this.$data.inspectedPlace = null
      this.$data.infoWindowOpen = false
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$refs.primaryMap.mapObject.invalidateSize();
    });
  },
  components: { InfoWindow, MarkerGroup }
}
</script>
