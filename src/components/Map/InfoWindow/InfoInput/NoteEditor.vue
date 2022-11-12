<script>
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const savePlaceDialogStore = useSavePlaceDialogStore()
    const savedPlacesStore = useSavedPlacesStore()

    const isLoading = ref(false)
    const notesValue = ref(savedPlacesStore.findById(savePlaceDialogStore.placeId)?.notes ?? '')

    const handleCloseDialogClick = () => {
      notesValue.value = savedPlacesStore.findById(savePlaceDialogStore.placeId)?.notes ?? ''
      emit('click:close')
    }
    const handleSaveButtonClick = async () => {
      try {
        isLoading.value = true
        await savedPlacesStore.patch(savePlaceDialogStore.placeId, { notes: notesValue.value })
        emit('success', notesValue)
      } catch(e) {
        console.error(e)
        emit('error', e)
      } finally {
        isLoading.value = false
      }
    }

    return { notesValue, handleCloseDialogClick, handleSaveButtonClick, isLoading }
  },
})
</script>

<template>
  <v-sheet height="100%">
    <v-toolbar color="primary" dark>
      <v-btn @click="handleCloseDialogClick" icon><v-icon>mdi-close</v-icon></v-btn>
      <v-toolbar-title>Edit note</v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="isOnPC"
        text
        @click="handleSaveButtonClick"
        :loading="isLoading"
      >Save</v-btn>
      <v-btn
        v-else
        icon
        @click="handleSaveButtonClick"
        :loading="isLoading"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="pa-4" style="height: 100%" >
      <v-textarea
        flat
        outlined
        height="100%"
        no-resize
        v-model="notesValue"
        label="Notes"
      />
    </div>
  </v-sheet>
</template>
