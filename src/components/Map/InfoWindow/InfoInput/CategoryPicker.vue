<template>
  <v-card>
    <v-card-title>Select a list</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="selectedCategory"
        :items="categoriesStore.categories"
        item-text="category"
        item-value="id"
        label="List"
        clearable
      >
        <template #item="{ item }">
          <v-list-item-icon>
            <v-icon :color="item.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.category }}</v-list-item-content>
        </template>
      </v-autocomplete>
    </v-card-text>
    <v-card-actions>
      <v-dialog
        fullscreen
        v-model="colorManagerOpen"
      >
        <ColorManager />
        <template #activator="{ on }">
          <v-btn text v-on="on">Manage</v-btn>
        </template>
      </v-dialog>
      <v-spacer />
      <v-btn color="primary">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { usePlaceDetailWindowStateStore } from '@/store/placeDetailWindowStateStore'
import { defineComponent, ref } from 'vue'
import ColorManager from "@/components/Map/InfoWindow/ColorGrouping/ColorManager.vue"

export default defineComponent({
  setup(props, { emit }) {
    const categoriesStore = useCategoriesStore()
    const placeDetailsDisplayStore = usePlaceDetailWindowStateStore()

    const selectedCategory = ref(placeDetailsDisplayStore.inspectedPlace.category)

    const emitCategory = () => {
      return emit('input', selectedCategory.value.length ? selectedCategory.value : null)
    }

    const colorManagerOpen = ref(false)

    return {
      selectedCategory,
      emitCategory,
      categoriesStore,
      placeDetailsDisplayStore,
      colorManagerOpen
    }
  },
  components: {
    ColorManager
  }
})
</script>

