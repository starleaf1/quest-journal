<template>
  <v-dialog
    :fullscreen="!isOnPC"
    :value="open"
    @click:outside="handleCloseDialog"
  >
    <v-sheet :min-height="isOnPC ? '300px' : '100%'" width="100%">
      <v-toolbar dense>
        <v-btn icon @click="handleCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h5 class="text-h6 pb-0">{{place?.name}}</h5>
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
          <v-tooltip bottom>
            <span>Add to collection</span>
            <template #activator="{ on }">
              <v-btn
                fab v-on="on"
                color="accent"
                :small="!isOnPC"
                right
                bottom
                absolute
              >
                <v-icon>mdi-pin</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
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
        <OpeningHours v-if="placeData?.opening_hours" :opening-hours="placeData?.opening_hours" :business-status="placeData?.business_status" />
      </v-card-text>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { usePlaceDetailsStore } from '@/store/placeDetails'
import OpeningHours from './OpeningHours.vue'

export default {
  name: "PlaceDetailsDialog",
  mounted () {
    console.log('[breakpoints] Is on PC', this.isOnPC)
  },
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
        ...this.placeDetails
      };
    }
  },
  data() {
    return ({
      placeDetails: {},
      loading: false
    });
  },
  methods: {
    handleCloseDialog() {
      this.$emit("click:outside");
    },
    async getPlaceDetails(placeId) {
      const placeDetailsStore = usePlaceDetailsStore();
      try {
        this.$data.loading = true;
        this.$data.placeDetails = await placeDetailsStore.getDetailsById(placeId);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.$data.loading = false;
      }
    }
  },
  watch: {
    place(v) {
      this.getPlaceDetails(v?.place_id);
    }
  },
  components: { OpeningHours }
}
</script>
