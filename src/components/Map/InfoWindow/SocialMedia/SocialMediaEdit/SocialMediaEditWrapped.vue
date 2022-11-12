<script>
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import { defineComponent, ref } from 'vue'
import SocialMediaInput from './'

export default defineComponent({
  setup(props, { emit }) {
    const savePlaceDialogStore = useSavePlaceDialogStore()
    const savedPlacesStore = useSavedPlacesStore()

    const isLoading = ref(false)

    const socialMedia = ref(savedPlacesStore.findById(savePlaceDialogStore.placeId)?.socialMedia ?? [])

    const socialMediaInputElement = ref(null)

    const handleSaveButtonClick = async () => {
      try {
        isLoading.value = true
        socialMedia.value = socialMedia.value.filter(link => link.url.length)
        await savedPlacesStore.patch(savePlaceDialogStore.placeId, { socialMedia: socialMedia.value })
        socialMediaInputElement.value.reset()
        emit('success')
      } catch(e) {
        emit('error', e)
      } finally {
        isLoading.value = false
      }
    }

    const handleCloseButtonClick = () => {
      socialMedia.value = savedPlacesStore.findById(savePlaceDialogStore.placeId)?.socialMedia ?? []
      socialMediaInputElement.value.reset()
      emit('click:close')
    }

    return { socialMedia, isLoading, handleSaveButtonClick, handleCloseButtonClick, socialMediaInputElement }
  },
  components: {
    SocialMediaInput
  }
})
</script>

<template>
  <v-sheet style="height: 100%">
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn icon @click="handleCloseButtonClick"><v-icon>mdi-close</v-icon></v-btn>
      <v-toolbar-title>Links</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="isOnPC" :loading="isLoading" text @click="handleSaveButtonClick">Save</v-btn>
      <v-btn v-else :loading="isLoading" icon @click="handleSaveButtonClick"><v-icon>mdi-check</v-icon></v-btn>
    </v-toolbar>
    <div class="pa-4">
      <SocialMediaInput
        ref="socialMediaInputElement"
        v-model="socialMedia"
      />
    </div>
  </v-sheet>
</template>
