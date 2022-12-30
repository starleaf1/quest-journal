<template>
  <v-dialog
    fullscreen
    :value="open"
    @click:outside="handleCloseDialog"
  >
    <InfoInputBottomSheet />
    <v-sheet class="pb-10" min-height="100vh" width="100%">
      <v-toolbar dense color="primary" dark>
        <v-btn icon @click="handleCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6 pb-0">Details</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-tooltip v-if="!isPlaceSaved" bottom>
            <span>Add to wishlist</span>
            <template #activator="{ on: tooltip }">
              <v-btn
                v-if="isOnPC"
                v-on="{ ...tooltip }"
                text
                :loading="isSubmitting"
                @click="savePlace"
              >
                Add to wishlist
              </v-btn>
              <v-btn
                v-else
                v-on="{ ...tooltip }"
                icon
                :loading="isSubmitting"
                @click="savePlace"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-else bottom>
            <span>Change list, tags, notes, links</span>
            <template #activator="{ on: tooltip }">
              <v-btn
                v-if="isOnPC"
                v-on="{ ...tooltip }"
                text
                :loading="isSubmitting"
                @click="openSaveDialog(place?.place_id)"
              >
                Change details
              </v-btn>
              <v-btn
                v-else
                v-on="{ ...tooltip }"
                icon
                :loading="isSubmitting"
                @click="openSaveDialog(place?.place_id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <InfoWindowMenu
            :items="[
              {
                icon: 'mdi-launch',
                label: 'Open in Google Maps',
                href: placeData.url
              }
            ]"
          />
        </v-toolbar-items>
        <template #extension>
          <v-chip-group class="pt-0 ma-0">
            <v-chip
              v-for="tag in placeTags ?? []"
              :key="tag"
              class="mr-1 my-0"
              outlined
              x-small
              v-text="tag"
            />
          </v-chip-group>
        </template>
      </v-toolbar>
      <v-card-title>{{ place?.name }}</v-card-title>
      <v-card-subtitle v-if="isPlaceSaved">
        <v-icon x-small left :color="categoryValue?.color ?? 'black'">mdi-circle</v-icon>
        <span>{{ categoryValue?.category ?? 'Uncategorized' }}</span>
      </v-card-subtitle>
      <InfoWindowLoadingSkeleton v-if="loading" />
      <v-card-text v-else>
        <p class="text-body2">{{placeData?.formatted_address}}</p>
        <OpeningHours
          class="mb-2 mr-2"
          v-if="placeData?.opening_hours"
          :opening-hours="placeData?.opening_hours"
          :business-status="placeData?.business_status"
        />
        <ReviewStarsChip
          v-if="placeData?.rating"
          :rating="placeData?.rating"
          :number-of-reviews="placeData?.user_ratings_total"
        />
        <PhotoGallery v-if="placeData?.photos" :images="placeData?.photos" class="my-6" />
        <div v-if="placeData?.notes?.length">
          <h3 class="text-h7">My notes</h3>
          <div class="text-body-1" v-html="sanitizedNotes" />
        </div>
        <div class="mt-2" v-if="placeData?.socialMedia?.length">
          <h3 class="text-h7 mb-1">Links &amp; social media</h3>
          <SocialMediaLink
            v-for="link in socialMedia"
            :key="link.url"
            v-bind="link"
          />
        </div>
        <div class="mt-4" v-if="tagsValue?.length">
          <h3 class="text-h7">Tags</h3>
          <v-chip-group column>
            <v-chip
              v-for="tag in tagsValue"
              :key="tag"
              color="primary"
              outlined
              link
              v-text="tag"
            />
          </v-chip-group>
        </div>
      </v-card-text>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { usePlaceDetailsStore } from '@/store/placeDetails'
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore'
import OpeningHours from './OpeningHours.vue'
import PhotoGallery from './PhotoGallery/index.vue';
import SocialMediaLink from './SocialMedia/SocialMediaLink.vue'
import InfoWindowMenu from './InfoWindowMenu.vue'
import InfoWindowLoadingSkeleton from './InfoWindowLoadingSkeleton.vue'
import InfoInputBottomSheet from './InfoInput/InfoInputBottomSheet.vue'
import ReviewStarsChip from './ReviewStarsChip.vue'
import sanitizeHtml from 'sanitize-html'

export default defineComponent({
  name: "PlaceDetailsDialog",
  props: {
    open: {
      default: () => false
    },
    place: {
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const savedPlacesStore = useSavedPlacesStore()
    const categoriesStore = useCategoriesStore()
    const placeDetailsStore = usePlaceDetailsStore()
    const savePlaceDialogStore = useSavePlaceDialogStore()

    const { append, remove } = placeDetailsStore
    const { openSaveDialog } = savePlaceDialogStore

    const savedDialogOpen = ref(false)
    const placeDetails = ref({})
    const isLoading = ref(false)
    const isSubmitting = ref(false)
    const noteValue = ref("")
    const tagsValue = ref([])
    const categoryValue = ref(null)
    const socialMedia = ref([])

    const savedPlaces = computed(() => savedPlacesStore.savedPlaces)
    const categories = computed(() => categoriesStore.categories)
    const extraSavedData = computed(() => (
      savedPlaces.value.find(place => place?.place_id === this.place?.place_id)
    ))
    const placeData = computed(() => ({
      ...props.place,
      ...placeDetails.value,
      ...extraSavedData.value
    }))
    const isPlaceSaved = computed(() => !!extraSavedData.value)
    const sanitizedNotes = computed(() => {
      const lineBroke = this.placeData?.notes.replace(/(?:\r\n|\r|\n)/g, '<br />')
      if (!lineBroke) return null
      return sanitizeHtml(lineBroke, {
        allowedTags: ['br', 'p']
      })
    })

    const handleCloseDialog = () => {
      emit("click:close")
    }
    const getPlaceDetails = async (placeId) => {
      try {
        isLoading.value = true;
        placeDetails.value = await placeDetailsStore.getDetailsById(placeId);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.$data.loading = false;
      }
    }

    const populateInputs = () => {
      console.log('[info-window] Triggering population input...', this.$data.socialMedia)
      noteValue.value = placeData.value?.notes ?? ''
      tagsValue.value = placeData.value?.tags ?? []
      socialMedia.value = placeData.value?.socialMedia ?? []
      categoryValue.value = categories.value.find(
        category => (
          placeData.value?.category === category.category
        )
      )
    }

    const savePlace = async () => {
      try {
        isSubmitting.value = true
        await append({
          ...placeData.value,
          notes: noteValue.value,
          tags: tagsValue.value,
          category: categoryValue.value,
          socialMedia: socialMedia.value
        })
        openSaveDialog(this.place?.place_id)
      } catch (e) {
        console.error('[info-window]', e)
      } finally {
        isSubmitting.value = false
      }
    }

    const handleDeleteButtonClick = async () => {
      try {
        await remove(placeData.value.place_id)
      } catch (e) {
        console.error('[delete-button-click]', e)
      }
    }

    watch(props.place, (v) => {
      getPlaceDetails(v?.place_id);
    })
    watch(placeData, () => {
      populateInputs()
    })

    return {
      isSubmitting,
      noteValue,
      loading: isLoading,
      isPlaceSaved,
      savedPlaces,
      categories,
      placeData,
      sanitizedNotes,
      handleCloseDialog,
      savePlace,
      savedDialogOpen,
      handleDeleteButtonClick
    }
  },
  components: {
    OpeningHours,
    PhotoGallery,
    SocialMediaLink,
    InfoWindowMenu,
    InfoWindowLoadingSkeleton,
    InfoInputBottomSheet,
    ReviewStarsChip,
  }
})
</script>
