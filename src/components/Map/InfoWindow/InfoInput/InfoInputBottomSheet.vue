<template>
  <v-bottom-sheet v-model="savePlaceDialogStore.isSaveDialogOpen">
    <v-toolbar flat>
      <v-toolbar-title>Saved to favorites</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        text
        @click="savePlaceDialogStore.closeSaveDialog()"
      >
        Done
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-dialog>
        <template #activator="{ on }">
          <v-list-item
            two-line
            v-on="on"
          >
            <v-list-item-content>
              <v-list-item-title v-text="'Add to list'" />
              <v-list-item-subtitle
                v-text="savedPlace?.category?.length ? savedPlace.category : 'Uncategorized'"
              />
            </v-list-item-content>
          </v-list-item>
        </template>
        <CategoryPicker />
      </v-dialog>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Tags</v-list-item-title>
          <v-list-item-subtitle v-text="tagOptionLabel" />
        </v-list-item-content>
      </v-list-item>
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
import CategoryPicker from "./CategoryPicker.vue"

export default defineComponent({
  setup () {
    const savePlaceDialogStore = useSavePlaceDialogStore()
    const savedPlacesStore = useSavedPlacesStore()

    const savedPlace = computed(() => {
      return savedPlacesStore.findById(savePlaceDialogStore.placeId)
    })

    const tagOptionLabel = computed(() => {
      if (!savedPlace.value?.tags?.length) return 'Add tags'
      return (
        savedPlace.value?.tags?.length <= 3 ?
        savedPlace.value?.tags?.join(', ') : 
        `${savedPlace.value?.tags?.slice(0, 2)}, +${savedPlace.value?.tags?.length - 2} more`
      )
    })

    return {
      savePlaceDialogStore,
      savedPlacesStore,
      savedPlace,
      tagOptionLabel
    }
  },
  components: {
    CategoryPicker
  }
})
</script>

