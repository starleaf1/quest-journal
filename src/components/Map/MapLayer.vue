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
      v-if="!currentKeyword?.length"
    />
    <SearchResultsLayer @click:marker="showInfoWindow" v-else />
    <PrimaryCoordinates
      v-if="markedPlaceInfo.place_id"
      :place="markedPlaceInfo"
      @click:marker="showInfoWindow"
    />
    <PositionMarker />
    <InfoWindow
      :place="inspectedPlace"
      :open="infoWindowOpen"
      @click:outside="hideInfoWindow"
    />
    <SavedPlacesLayer @click:marker="showInfoWindow" />
    <CenterToMe />
    <v-expand-transition>
      <FilterIndicator v-if="categoriesInFilter.length" />
    </v-expand-transition>
  </l-map>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSavedPlacesStore } from '@/store/savedPlaces'
import InfoWindow from "./InfoWindow"
import MarkerGroup from "./MarkerGroup.vue"
import SearchResultsLayer from "./SearchResultsLayer.vue"
import { v4 as uuid } from 'uuid'
import { useComponentCommunicator } from '@/store/componentCommunicator'
import SavedPlacesLayer from './SavedPlacesLayer/index.vue'
import PrimaryCoordinates from "./PrimaryCoordinates"
import { useMapStateStore } from '@/store/mapState'
import { useSearchResultStore } from '@/store/searchResult'
import { usePlaceDetailWindowStateStore } from '@/store/placeDetailWindowStateStore'
import { useGeolocationStore } from '@/store/geolocation'
import PositionMarker from './PositionMarker.vue'
import CenterToMe from './Controls/CenterToMe.vue'
import { useCategoriesStore } from '@/store/categoriesStore'
import FilterIndicator from '@/components/Map/Controls/FilterIndicator.vue'

export default {
  name: "MapLayer",
  computed: {
    ...mapState(useSavedPlacesStore, ['savedPlaces']),
    ...mapState(useComponentCommunicator, ['mapPanOrder', 'markedPlaceInfo']),
    ...mapState(useSearchResultStore, ['currentKeyword']),
    ...mapState(usePlaceDetailWindowStateStore, ['inspectedPlace', 'infoWindowOpen']),
    ...mapState(useCategoriesStore, ['categoriesInFilter'])
  },
  watch: {
    mapPanOrder: {
      immediate: false,
      handler(v) {
        if (v.lat && v.lng) this.handlePanOrder(v)
      }
    }
  },
  data() {
    return ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [-8.4537137, 114.5110415],
      places: [],
      bounds: null
    });
  },
  methods: {
    ...mapActions(useMapStateStore, ['setBounds']),
    ...mapActions(usePlaceDetailWindowStateStore, ['showInfoWindow', 'hideInfoWindow']),
    ...mapActions(useGeolocationStore, ['beginWatching']),
    handlePanOrder ({ lat, lng, zoom }) {
      this.$refs.primaryMap.mapObject.setView({ lat, lng }, zoom, {
        animate: true,
        duration: 1
      })
    },
    handleBoundsChange (e) {
      this.$data.bounds = e
      this.setBounds(e)
      this.$emit('update:bounds', e)
    },
    handleContextClick(e) {
      const { latlng: location } = e
      const name = `${Math.abs(location.lat)}${location.lat >= 0 ? 'N' : 'S'}, ${Math.abs(location.lng)}${location.lng >= 0 ? 'E' : 'W'}`
      const place_id = uuid()
      this.showInfoWindow({
        place_id,

        // Need to adapt to Places API's formatting, which is method-based
        geometry: {
          location: {
            lat: () => location.lat,
            lng: () => location.lng
          }
        },
        name
      })
    },
    handleMapReady() {
      this.beginWatching()
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$refs.primaryMap.mapObject.invalidateSize();
    });
  },
  components: {
    InfoWindow,
    MarkerGroup,
    SavedPlacesLayer,
    SearchResultsLayer,
    PrimaryCoordinates,
    PositionMarker,
    CenterToMe,
    FilterIndicator
  }
}
</script>
