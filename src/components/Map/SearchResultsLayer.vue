<template>
  <BaseMarkers
    :places="searchResults"
    @click:marker="handleMarkerClick"
  />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSearchResultStore } from '@/store/searchResult'
import { useMapStateStore } from '@/store/mapState'
import BaseMarkers from './BaseMarkers.vue'
export default {
  name: "SearchResultLayer",
  computed: {
    ...mapState(useSearchResultStore, ["searchResults"]),
    ...mapState(useMapStateStore, ["bounds"])
  },
  methods: {
    ...mapActions(useSearchResultStore, ['fetchSearchResults', 'repeatSearchWithBounds']),
    handleMarkerClick (place) {
      this.$emit('click:marker', place)
    }
  },
  watch: {
    bounds: {
      handler (v) {
        this.repeatSearchWithBounds(v)
      }
    }
  },
  components: { BaseMarkers }
}
</script>
