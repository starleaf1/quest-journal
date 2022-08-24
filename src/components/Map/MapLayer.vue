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
import { getPlacesInBounds } from "@/api/placesQueries"
import BaseMarkers from "./BaseMarkers.vue"
import _ from "lodash"
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { collection, onSnapshot } from '@firebase/firestore'
import { useAuthStore } from "@/store/authStore"
import InfoWindow from "./InfoWindow.vue"

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
      infoWindowOpen: false
    });
  },
  methods: {
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
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$refs.primaryMap.mapObject.invalidateSize();
    });
  },
  components: { BaseMarkers, InfoWindow }
}
</script>
