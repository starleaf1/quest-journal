<template>
  <l-map
    style="height: 100%; z-index: 0;"
    ref="primaryMap"
    @update:bounds="handleBoundsChange"
    :zoom="11"
    :center="center"
  >
    <l-tile-layer :url="tileUrl" />
    <!-- <BaseMarkers
      :places="places"
      @click:marker="showInfoWindow"
    /> -->
    <MarkerGroup :bounds="bounds" />
    <InfoWindow
      :place="inspectedPlace"
      :open="infoWindowOpen"
      @click:outside="hideInfoWindow"
    />
  </l-map>
</template>

<script>
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { collection, onSnapshot } from '@firebase/firestore'
import { useAuthStore } from "@/store/authStore"
import InfoWindow from "./InfoWindow.vue"
import MarkerGroup from "./MarkerGroup.vue"

export default {
  name: "MapLayer",
  computed: {
    savedPlaces: {
      get() {
        const savedPlacesStore = useSavedPlacesStore()
        return savedPlacesStore.savedPlaces
      }
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
      this.$data.bounds(e)
    },
    unsubscribe() {
      const authStore = useAuthStore()
      const savedPlacesStore = useSavedPlacesStore()

      return onSnapshot(collection(`journals/${authStore.user.uid}`), snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            savedPlacesStore.append(change.doc.data())
          }
          if (change.type === 'remove') savedPlacesStore.remove(change.doc.id)
        })
      })
    },
    showInfoWindow(place) {
      this.$data.inspectedPlace = place
      this.$data.infoWindowOpen = true
    },
    hideInfoWindow() {
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
