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
        <PhotoGallery v-if="placeData?.photos" :images="placeData?.photos" class="py-6" />
        <v-textarea :disabled="isSubmitting" class="mt-2" v-model="noteValue" outlined label="My notes" />
        <div class="d-flex align-center">
          <TagInput :disabled="isSubmitting" v-model="tagsValue" />
          <v-spacer />
          <ColorInput :disabled="isSubmitting" v-model="categoryValue" />
        </div>
      </v-card-text>
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
    ...mapState(useSavedPlacesStore, ['savedPlaces']),
    extraSavedData () {
      return this.savedPlaces.find(place => place?.place_id === this.place?.place_id)
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
      categoryValue: null
    });
  },
  methods: {
    ...mapActions(usePlaceDetailsStore, ['getDetailsById']),
    ...mapActions(useSavedPlacesStore, ['append']),

    populateInputs () {
      this.$data.noteValue = this.placeData?.notes ?? ''
      this.$data.tagsValue = this.placeData?.tags ?? []
      this.$data.categoryValue = this.placeData?.category
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
          category: this.$data.categoryValue
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.$data.isSubmitting = false
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
  components: { OpeningHours, PhotoGallery, TagInput, ColorInput }
}
</script>
