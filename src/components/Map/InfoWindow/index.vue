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
            <span>Add to collection</span>
            <template #activator="{ on: tooltip }">
              <v-btn
                v-if="isOnPC"
                v-on="{ ...tooltip }"
                text
                :loading="isSubmitting"
                @click="savePlace"
              >
                Add to collection
              </v-btn>
              <v-btn
                v-else
                v-on="{ ...tooltip }"
                icon
                :loading="isSubmitting"
                @click="savePlace"
              >
                <v-icon>mdi-star-plus</v-icon>
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
                Change Details
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
          <p class="text-body-1" v-text="placeData?.notes" />
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
import { usePlaceDetailsStore } from '@/store/placeDetails'
import { mapActions, mapState } from 'pinia';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import OpeningHours from './OpeningHours.vue'
import PhotoGallery from './PhotoGallery/index.vue';
import SocialMediaLink from './SocialMedia/SocialMediaLink.vue'
import InfoWindowMenu from './InfoWindowMenu.vue'
import InfoWindowLoadingSkeleton from './InfoWindowLoadingSkeleton.vue'
import InfoInputBottomSheet from './InfoInput/InfoInputBottomSheet.vue'
import { useSavePlaceDialogStore } from '@/store/savePlaceDialogStore';
import ReviewStarsChip from './ReviewStarsChip.vue';

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
    ...mapActions(useSavePlaceDialogStore, ['openSaveDialog', 'closeSaveDialog']),

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
        this.openSaveDialog(this.place?.place_id)
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
      this.populateInputs()
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
}
</script>
