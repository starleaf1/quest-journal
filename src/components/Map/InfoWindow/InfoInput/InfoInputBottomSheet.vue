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
      <v-dialog v-model="isCategoryPickerVisible">
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
        <CategoryPicker @success="isCategoryPickerVisible = false" />
      </v-dialog>
      <v-dialog v-model="isTaggerVisible">
        <template #activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-content>
              <v-list-item-title>Tags</v-list-item-title>
              <v-list-item-subtitle v-text="tagOptionLabel" />
            </v-list-item-content>
          </v-list-item>
        </template>
        <TagInputModal @success="isTaggerVisible = false" />
      </v-dialog>
      <v-dialog :fullscreen="!isOnPC" v-model="isLinksEditorVisible">
        <template #activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-content>
              <v-list-item-title>Links &amp; social media</v-list-item-title>
              <v-list-item-subtitle v-text="linksOptionLabel" />
            </v-list-item-content>
          </v-list-item>
        </template>
        <SocialMediaEditWrapped
          @click:close="isLinksEditorVisible = false"
          @success="isLinksEditorVisible = false"
        />
      </v-dialog>
      <v-dialog :fullscreen="!isOnPC" v-model="isNotesEditorVisible">
        <template #activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-content>
              Notes
            </v-list-item-content>
          </v-list-item>
        </template>
        <NoteEditor
          @success="isNotesEditorVisible = false"
          @click:close="isNotesEditorVisible = false"
        />
      </v-dialog>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import { defineComponent, computed, ref } from 'vue';
import CategoryPicker from "./CategoryPicker.vue"
import TagInputModal from "./TagInput/TagInputModal.vue"
import NoteEditor from "./NoteEditor.vue"
import SocialMediaEditWrapped from "../SocialMedia/SocialMediaEdit/SocialMediaEditWrapped.vue"

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
        `${savedPlace.value?.tags?.slice(0, 2).join(', ')}, +${savedPlace.value?.tags?.length - 2} more`
      )
    })

    const linksOptionLabel = computed(() => {
      const noLinks = savedPlace.value?.socialMedia?.length
      if (!noLinks) return 'Add links to websites and social media pages'
      const linkTypes = savedPlace.value?.socialMedia.map?.(link => link.name)
      const label = `${linkTypes.slice(0, -1).join(', ')}${linkTypes.length > 1 ? ` & ${linkTypes.slice(-1)}` : ''}`
      return `${noLinks} links, including ${label}`
    })

    const isCategoryPickerVisible = ref(false)
    const isTaggerVisible = ref(false)
    const isNotesEditorVisible = ref(false)
    const isLinksEditorVisible = ref(false)

    return {
      savePlaceDialogStore,
      savedPlacesStore,
      savedPlace,
      tagOptionLabel,
      isCategoryPickerVisible,
      isTaggerVisible,
      linksOptionLabel,
      isNotesEditorVisible,
      isLinksEditorVisible
    }
  },
  components: {
    CategoryPicker,
    TagInputModal,
    NoteEditor,
    SocialMediaEditWrapped
  }
})
</script>

