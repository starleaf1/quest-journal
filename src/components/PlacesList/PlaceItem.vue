<template>
  <v-list-item
    three-line
  >
    <v-list-item-content>
      <v-list-item-title>{{place.name}}</v-list-item-title>
      <v-list-item-subtitle>{{place.formatted_address}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        icon
        color="primary"
        @click="handleMapSearchClick(place)"
      >
        <v-icon>mdi-map-search</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'pinia'
import { useComponentCommunicator } from '@/store/componentCommunicator'
export default {
  name: 'PlaceItem',
  props: {
    place: {
      type: Object,
      required: true
    },
  },
  methods: {
    ...mapActions(useComponentCommunicator, ['orderMapPan', 'markPlace']),
    handleMapSearchClick (place) {
      this.orderMapPan({ ...place.geometry.location, zoom: 17 })
      this.markPlace({ ...place.geometry.location })
    }
  }
}
</script>
