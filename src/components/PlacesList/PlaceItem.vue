<template>
  <v-dialog>
    <template #activator="{ on }">
      <v-list-item
        three-line
        v-on="on"
      >
        <v-list-item-content>
          <v-list-item-title>{{place.name}}</v-list-item-title>
          <v-list-item-subtitle>{{place.formatted_address}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            color="primary"
            @click.stop="handleMapSearchClick(place)"
          >
            <v-icon>mdi-map-search</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
    <SavedInfoDialog :place="place" />
  </v-dialog>
</template>

<script>
import { mapActions } from 'pinia'
import { useComponentCommunicator } from '@/store/componentCommunicator'
import SavedInfoDialog from './SavedInfoDialog.vue'
export default {
    name: "PlaceItem",
    props: {
        place: {
            type: Object,
            required: true
        },
    },
    methods: {
        ...mapActions(useComponentCommunicator, ["orderMapPan", "markPlace"]),
        handleMapSearchClick(place) {
            this.orderMapPan({ ...place.geometry.location, zoom: 17 });
            this.markPlace({ ...place });
        }
    },
    components: { SavedInfoDialog }
}
</script>
