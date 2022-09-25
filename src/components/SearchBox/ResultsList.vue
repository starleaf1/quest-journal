<template>
  <v-list>
    <v-list-item @click="handlePlaceSelected(place)" v-for="place in searchResults" :key="place.place_id">
      <v-list-item-icon><img height="10px" :src="place.icon" /></v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{place.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSearchResultStore } from '@/store/searchResult'
import { useComponentCommunicator } from '@/store/componentCommunicator'
export default {
  name: 'ResultsList',
  computed: {
    ...mapState(useSearchResultStore, ['searchResults'])
  },
  methods: {
    ...mapActions(useComponentCommunicator, ['markPlace', 'orderMapPan']),
    handlePlaceSelected (place) {
      this.markPlace(place)
      this.orderMapPan({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 15
      })
    }
  }
}
</script>
