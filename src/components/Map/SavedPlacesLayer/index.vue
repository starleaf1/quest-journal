<template>
  <fragment>
    <ColorGroup
      v-for="color in filteredCategories"
      :key="color.id"
      :color="color.id"
      @click:marker="handleMarkerClick"
    />
    <ColorGroup
      v-if="isUncategorizedDisplayed"
      :color="null"
      @click:marker="handleMarkerClick"
    />
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/store/categoriesStore';
import ColorGroup from './ColorGroup.vue';

export default {
  name: "SavedPlacesMarkers",
  computed: {
    ...mapState(useCategoriesStore, ["categories", "categoriesInFilter"]),
    filteredCategories () {
      return this.categoriesInFilter.length ? this.categories.filter(c => this.categoriesInFilter.includes(c.id)) : this.categories
    },
    isUncategorizedDisplayed () {
      return this.categoriesInFilter.includes(null) || !this.categoriesInFilter.length
    }
  },
  methods: {
    handleMarkerClick(e) {
      this.$emit('click:marker', e)
    },
    ...mapActions(useCategoriesStore, ['findAllMembers'])
  },
  components: { ColorGroup },
}
</script>
