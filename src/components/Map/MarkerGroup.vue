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
import { mapState, mapActions } from 'pinia'
import { collection, onSnapshot } from '@firebase/firestore';
import { useComponentCommunicator } from '@/store/componentCommunicator';

export default {
  name: "MarkerGroup",
  components: { BaseMarkers },
  props: {
    bounds: {
      required: true
    }
  },
  computed: {
    ...mapState(useAuthStore, ['uid']),
    ...mapState(useComponentCommunicator, ['markedPlaceInfo'])
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
    ...mapActions(useSavedPlacesStore, ['append', 'remove']),
    unsubscribe() {
      return onSnapshot(collection(`journals/${this.uid}`), snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            this.append(change.doc.data())
          }
          if (change.type === 'remove') this.remove(change.doc.id)
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
          const isUnique = !existing.some(existingPlace => existingPlace.place_id === newPlace.place_id)
          return isUnique
        }

        const existing = _.cloneDeep(this.$data.places)

        const unique = newPlaces.filter(placeFilter)
        const newCollection = [...existing, ...unique]
        if (newCollection.length > 200) newCollection.splice(0, newCollection.length - 200)
        this.$data.places = newCollection
      }

      const fetchPlaces = async () => {
        const places = await getPlacesInBounds(e);
        appendPlaces(places.filter(place => {
          return !place.types?.includes('political')
        }))
      }
      return _.debounce(fetchPlaces, 1000, { leading: true, trailing: false })()
    }
  }
}
</script>
