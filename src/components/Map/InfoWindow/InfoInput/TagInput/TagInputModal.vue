<script>
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import { defineComponent, ref } from 'vue'
import TagInput from './'

export default defineComponent({
  name: "TagInputModal",
  setup(props, { emit }) {
    const savedPlacesStore = useSavedPlacesStore()
    const savePlaceDialogStore = useSavePlaceDialogStore()
    const picked = ref(savedPlacesStore.findById(savePlaceDialogStore.placeId)?.tags ?? [])

    const isSubmitting = ref(false)

    const handleSubmitClicked = async () => {
      try {
        isSubmitting.value = true
        savedPlacesStore.patch(savePlaceDialogStore.placeId, { tags: picked.value })
        emit('success')
      } catch (e) {
        emit('error')
      } finally {
        isSubmitting.value = false
      }
    }
    const handleCloseClicked = () => {
      picked.value = savedPlacesStore.findById(savePlaceDialogStore.placeId)?.tags ?? []
      emit('click:close')
    }

    return { picked, handleSubmitClicked, handleCloseClicked, isSubmitting }
  },
  components: {
    TagInput
  }
})
</script>

<template>
  <v-card>
    <v-card-title>Tags</v-card-title>
    <v-card-text>
      <TagInput v-model="picked" />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        text
        @click="handleCloseClicked"
      >Cancel</v-btn>
      <v-btn
        color="primary"
        @click="handleSubmitClicked"
        :loading="isSubmitting"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
