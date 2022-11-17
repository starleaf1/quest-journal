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
        <CategoryPicker
          @success="isCategoryPickerVisible = false"
          @click:cancel="isCategoryPickerVisible = false"
          :key="`${savePlaceDialogStore.placeId}-category-editor`"
        />
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
        <TagInputModal
          @click:close="isTaggerVisible = false"
          @success="isTaggerVisible = false"
          :key="`${savePlaceDialogStore.placeId}-tag-editor`"
        />
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
          <v-list-item two-line v-on="on">
            <v-list-item-content>
              <v-list-item-title>Notes</v-list-item-title>
              <v-list-item-subtitle v-text="savedPlace.notes" />
            </v-list-item-content>
          </v-list-item>
        </template>
        <NoteEditor
          :key="`${savePlaceDialogStore.placeId}-note-editor`"
          @success="isNotesEditorVisible = false"
          @click:close="isNotesEditorVisible = false"
        />
      </v-dialog>
    </v-list>
    <div class="white text-center pa-4">
      <v-dialog v-model="isDeleteConfirmationOpen">
        <template #activator="{ on }">
          <v-btn v-on="on" color="error">
            <v-icon>mdi-delete</v-icon>
            <span>Remove from favorites</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Remove from favorites</v-card-title>
          <v-card-text>
            <p>Do you want to remove this place from your favorites? This will also delete:</p>
            <ul>
              <li>Notes you wrote</li>
              <li>Pictures you uploaded</li>
              <li>Social media and web links you added</li>
            </ul>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn v-if="!isDeletingPlace" text @click="isDeleteConfirmationOpen = false">No, cancel</v-btn>
            <v-btn :loading="isDeletingPlace" color="error">Yes, delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
      const linkTypes = [...new Set(savedPlace.value?.socialMedia.map?.(link => link.name))]
      const label = linkTypes.length > 1 ? `${linkTypes.slice(0, -1).join(', ')}${linkTypes.length > 1 ? ` & ${linkTypes.slice(-1)}` : ''}` : linkTypes[0]
      return `${noLinks} link${noLinks > 1 ? 's' : ''}, including ${label}`
    })

    const deletePlace = async () => {
      try {
        isDeletingPlace.value = true
        await savedPlacesStore.remove(savePlaceDialogStore.placeId)
      } catch (e) {
        console.error
      } finally {
        isDeletingPlace.value = false
      }
    }

    const isCategoryPickerVisible = ref(false)
    const isTaggerVisible = ref(false)
    const isNotesEditorVisible = ref(false)
    const isLinksEditorVisible = ref(false)
    const isDeleteConfirmationOpen = ref(false)
    const isDeletingPlace = ref(false)

    return {
      savePlaceDialogStore,
      savedPlacesStore,
      savedPlace,
      tagOptionLabel,
      isCategoryPickerVisible,
      isTaggerVisible,
      linksOptionLabel,
      isNotesEditorVisible,
      isLinksEditorVisible,
      isDeleteConfirmationOpen,
      isDeletingPlace,
      deletePlace,
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

