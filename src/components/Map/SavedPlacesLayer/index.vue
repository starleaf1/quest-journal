<template>
  <l-layer-group></l-layer-group>
</template>

<script>
import { mapState } from 'pinia'
import { useSavedPlacesStore } from '@/store/savedPlaces'

export default {
  name: 'SavedPlacesMarker',
  computed: {
    ...mapState(useSavedPlacesStore, ['savedPlaces'])
  },
  methods: {
    handleMarkerClick () {
      
    }
  }
}
</script>
