<template>
  <fragment>
    <v-sheet class="px-2 pt-1">
      <div>
        <h1 class="text-h6">My Saved Places</h1>
      </div>
      <v-chip-group
        multiple
        v-model="activeChips"
      >
        <v-chip
          filter
          outlined
          v-for="tag in tags"
          :key="tag.id"
        >
          {{ tag.name }}
        </v-chip>
      </v-chip-group>
    </v-sheet>
    <v-list nav subheader dense>
      <!-- <v-list-item
        three-line
        v-for="place in displayedPlaces"
        :key="place.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{place.name}}</v-list-item-title>
          <v-list-item-subtitle>{{place.formatted_address}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            color="primary"
            @click="handleMapSearchClick(place)"
          >
            <v-icon>mdi-map-search</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item> -->
      <PlaceGroup
        v-for="category in displayedCategories"
        :key="category.name"
        :category="category"
        @change:open="handleCategoryOpenChanged"
      />
    </v-list>
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useTagsStore } from '@/store/tagsStore'
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { useComponentCommunicator } from '@/store/componentCommunicator'
import { useCategoriesStore } from '@/store/categoriesStore'
import PlaceGroup from './PlaceGroup.vue'

export default {
  name: "PlacesList",
  computed: {
    ...mapState(useTagsStore, ["tags"]),
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useSavedPlacesStore, ["savedPlaces"]),
    displayedCategories() {
      const o = this.categories.map(category => ({
        name: category.category,
        places: this.savedPlaces.filter(place => place.category === category.category)
      }));
      return [
        ...o,
        {
          name: "Uncategorized",
          places: this.savedPlaces.filter(place => (!place.category ||
            !place.category.length))
        }
      ].filter(i => i.places.length > 0);
    },
    displayedPlaces() {
      return this.savedPlaces.filter(() => true);
    }
  },
  data() {
    return ({
      activeChips: []
    });
  },
  methods: {
    ...mapActions(useComponentCommunicator, ["orderMapPan", "markPlace"]),
    ...mapActions(useCategoriesStore, ['setCategoryFilter']),
    handleMapSearchClick(place) {
      this.orderMapPan({ ...place.geometry.location, zoom: 17 });
      this.markPlace({ ...place.geometry.location });
    },
    handleCategoryOpenChanged(input) {
      if (input.open) {
        this.setCategoryFilter(input ? [input?.category.id] : [])
      }
    }
  },
  components: { PlaceGroup }
}
</script>
