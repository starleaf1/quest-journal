<template>
  <l-layer-group>
    <BaseMarkers :places="places" @click:marker="handleMarkerClick" />
  </l-layer-group>
</template>

<script>
import { getPlacesInBounds } from '@/api/placesQueries';
import _ from "lodash"
import BaseMarkers from './BaseMarkers.vue';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useAuthStore } from '@/store/authStore';
import { collection, onSnapshot } from '@firebase/firestore';

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
    handleMarkerClick(e) {
      this.$emit('click:marker', e)
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
