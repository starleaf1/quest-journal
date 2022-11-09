<template>
  <v-dialog
    fullscreen
    :value="open"
    @click:outside="handleCloseDialog"
  >
    <v-sheet class="pb-10" min-height="100vh" width="100%">
      <v-toolbar dense color="primary" dark>
        <v-btn icon @click="handleCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6 pb-0">Details</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-tooltip bottom>
            <span>Add to collection</span>
            <template #activator="{ on: tooltip }">
              <v-btn
                v-if="isOnPC"
                v-on="{ ...tooltip }"
                text
                :loading="isSubmitting"
                @click="savePlace"
              >
                Save
              </v-btn>
              <v-btn
                v-else
                v-on="{ ...tooltip }"
                icon
                :loading="isSubmitting"
                @click="savePlace"
              >
                <v-icon>mdi-star</v-icon>
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
      <InfoWindowLoadingSkeleton v-if="loading" />
      <v-card-text v-else>
        <p class="text-body2">{{placeData?.formatted_address}}</p>
        <OpeningHours
          class="mb-2"
          v-if="placeData?.opening_hours"
          :opening-hours="placeData?.opening_hours"
          :business-status="placeData?.business_status"
        />
        <PhotoGallery v-if="placeData?.photos" :images="placeData?.photos" class="my-6" />
        <v-textarea :disabled="isSubmitting" class="mt-2" v-model="noteValue" outlined label="My notes" />
        <div class="d-sm-flex align-center">
          <TagInput class="mr-4" :disabled="isSubmitting" v-model="tagsValue" />
          <ColorInput class="ml-sm-4" :disabled="isSubmitting" v-model="categoryValue" />
        </div>
        <SocialMedia v-model="socialMedia" />
      </v-card-text>
      <div v-if="isPlaceSaved" class="d-flex justify-center align-center">
        <v-dialog>
          <template #activator="{ on: dialog }">
            <v-btn v-on="dialog" color="error">
              <v-icon left>mdi-delete</v-icon>
              <span>Delete</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Delete place</v-card-title>
            <v-card-text>
              Do you want to remove this place from your saved places list?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="handleDeleteButtonClick"
                text
                color="error"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { usePlaceDetailsStore } from '@/store/placeDetails'
import { mapActions, mapState } from 'pinia';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import OpeningHours from './OpeningHours.vue'
import PhotoGallery from './PhotoGallery/index.vue';
import TagInput from './InfoInput/TagInput/index.vue';
import ColorInput from './ColorGrouping/ColorInput.vue';
import SocialMedia from './SocialMedia/index.vue'
import InfoWindowMenu from './InfoWindowMenu.vue'
import InfoWindowLoadingSkeleton from './InfoWindowLoadingSkeleton.vue'

export default {
  name: "PlaceDetailsDialog",
  props: {
    open: {
      default: () => false
    },
    place: {
      default: () => ({})
    }
  },
  computed: {
    ...mapState(useSavedPlacesStore, ['savedPlaces']),
    ...mapState(useCategoriesStore, ['categories']),
    placeTags() {
      return this.placeData.types?.map?.(type => {
        const spaced = type.replace(/_/g, " ");
        return `${spaced.charAt(0).toUpperCase()}${spaced.slice(1)}`;
      });
    },
    placeData() {
      return {
        ...this.place,
        ...this.$data.placeDetails,
        ...this.extraSavedData
      };
    },
    extraSavedData () {
      return this.savedPlaces.find(place => place?.place_id === this.place?.place_id)
    },
    isPlaceSaved () {
      return !!this.extraSavedData
    }
  },
  data() {
    return ({
      saveDialogOpen: false,
      placeDetails: {},
      loading: false,
      isSubmitting: false,
      noteValue: '',
      tagsValue: [],
      categoryValue: null,
      socialMedia: []
    });
  },
  methods: {
    ...mapActions(usePlaceDetailsStore, ['getDetailsById']),
    ...mapActions(useSavedPlacesStore, ['append', 'remove']),

    populateInputs () {
      console.log('[info-window] Triggering population input...', this.$data.socialMedia)
      this.$data.noteValue = this.placeData?.notes ?? ''
      this.$data.tagsValue = this.placeData?.tags ?? []
      this.$data.socialMedia = this.placeData?.socialMedia ?? []
      this.$data.categoryValue = this.categories.find(
        category => (
          this.placeData?.category === category.category
        )
      )
    },

    handleCloseDialog() {
      this.$emit("click:outside");
    },
    async getPlaceDetails(placeId) {
      try {
        this.$data.loading = true;
        this.$data.placeDetails = await this.getDetailsById(placeId);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.$data.loading = false;
      }
    },
    async savePlace () {
      try {
        this.$data.isSubmitting = true
        await this.append({
          ...this.placeData,
          notes: this.$data.noteValue,
          tags: this.$data.tagsValue,
          category: this.$data.categoryValue,
          socialMedia: this.$data.socialMedia
        })
      } catch (e) {
        console.error('[info-window]', e)
      } finally {
        this.$data.isSubmitting = false
      }
    },
    async handleDeleteButtonClick () {
      try {
        await this.remove(this.placeData.place_id)
      } catch (e) {
        console.error('[delete-button-click]', e)
      }
    }
  },
  watch: {
    place(v) {
      this.getPlaceDetails(v?.place_id);
    },
    placeData () {
      console.log('[info-window-debug] place-data', this.placeData)
      this.populateInputs()
    }
  },
  components: {
    OpeningHours,
    PhotoGallery,
    TagInput,
    ColorInput,
    SocialMedia,
    InfoWindowMenu,
    InfoWindowLoadingSkeleton
  }
}
</script>
