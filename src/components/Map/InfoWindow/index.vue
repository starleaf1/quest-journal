<template>
  <v-dialog
    fullscreen
    :value="open"
    @click:outside="handleCloseDialog"
  >
    <v-sheet min-height="100vh" width="100%">
      <v-toolbar dense color="primary" dark>
        <v-btn icon @click="handleCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6 pb-0">{{place?.name}}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-tooltip bottom>
            <span>Add to collection</span>
            <template #activator="{ on: tooltip }">
              <v-btn
                v-on="{ ...tooltip }"
                :small="!isOnPC"
                text
                :loading="isSubmitting"
                @click="savePlace"
              >
                Save
              </v-btn>
            </template>
          </v-tooltip>
          <v-btn
            text
            :href="placeData.url"
            target="_blank"
          >
            Open in Google Maps
            <v-icon right>mdi-launch</v-icon>
          </v-btn>
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
      <v-container class="fill-height" v-if="loading">
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
          <span class="ml-4">Loading place details</span>
        </v-row>
      </v-container>
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
        <div class="d-flex align-center">
          <TagInput class="mr-4" :disabled="isSubmitting" v-model="tagsValue" />
          <ColorInput class="ml-4" :disabled="isSubmitting" v-model="categoryValue" />
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
              <v-btn @click="handleDeleteButtonClick" text color="error">Delete</v-btn>
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
import OpeningHours from './OpeningHours.vue'
import PhotoGallery from './PhotoGallery/index.vue';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import TagInput from './InfoInput/TagInput/index.vue';
import ColorInput from './ColorGrouping/ColorInput.vue';
import { useCategoriesStore } from '@/store/categoriesStore';
import SocialMedia from './SocialMedia/index.vue'

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
      socialMedia: {
        name: '',
        username: '',
        url: ''
      }
    });
  },
  methods: {
    ...mapActions(usePlaceDetailsStore, ['getDetailsById']),
    ...mapActions(useSavedPlacesStore, ['append', 'remove']),

    populateInputs () {
      this.$data.noteValue = this.placeData?.notes ?? ''
      this.$data.tagsValue = this.placeData?.tags ?? []
      this.$data.socialMedia = this.placeData?.socialMedia ?? {}
      this.$data.categoryValue = this.categories.find(category => this.placeData?.category === category.category)
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
        console.error(e)
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
      this.populateInputs()
    }
  },
  components: {
    OpeningHours,
    PhotoGallery,
    TagInput,
    ColorInput,
    SocialMedia
  }
}
</script>
