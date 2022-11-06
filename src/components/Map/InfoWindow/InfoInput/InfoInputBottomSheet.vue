<template>
  <v-bottom-sheet v-model="isSaveDialogOpen">
    <v-toolbar class="justify-space-between">
      <v-toolbar-title>Saved to favorites</v-toolbar-title>
      <v-btn color="primary" text>Done</v-btn>
    </v-toolbar>
    <v-list>
      <v-menu>
        <template #activator="{ on }">
          <v-list-item
            two-line
            v-on="on"
          >
            <v-list-item-content>
              <v-list-item-title v-text="'Add to list'" />
              <v-list-item-subtitle
                v-text="savedPlace.category?.length ? savedPlace.category : 'Uncategorized'"
              />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-menu>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Add more information</v-list-item-title>
          <v-list-item-subtitle>Notes, social media, and web links</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import { defineComponent, computed } from 'vue';

export default defineComponent({
  setup () {
    const savePlaceDialogStore = useSavePlaceDialogStore()
    const savedPlacesStore = useSavedPlacesStore()

    const savedPlace = computed(() => {
      return savedPlacesStore.findById(savePlaceDialogStore.placeId)
    })

    return {
      savePlaceDialogStore,
      savedPlacesStore,
      savedPlace
    }
  }
})
</script>

