<template>
  <v-card>
    <v-card-title>{{place.name}}</v-card-title>
    <v-card-text>
      <p>{{place.notes}}</p>
      <v-chip-group>
        <v-chip
          outlined
          v-for="tag in place.tags"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="error"
        text
        @click="handleDeleteButtonClick"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'pinia'
import { useSavedPlacesStore } from '@/store/savedPlaces'
export default {
  name: 'SavedInfoDialog',
  props: {
    place: {
      required: true,
      type: Object
    }
  },
  methods: {
    ...mapActions(useSavedPlacesStore, ['remove']),
    async handleDeleteButtonClick () {
      await this.remove(this.place.place_id)
    }
  }
}
</script>
