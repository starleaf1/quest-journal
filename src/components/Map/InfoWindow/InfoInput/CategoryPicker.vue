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
    <v-card-actions class="justify-md-end justify-space-between">
      <v-dialog
        fullscreen
        v-model="colorManagerOpen"
      >
        <ColorManager @click:close="colorManagerOpen = false" />
        <template #activator="{ on }">
          <v-btn text v-on="on">Manage</v-btn>
        </template>
      </v-dialog>
      <v-btn
        color="primary"
        :loading="isSubmitting"
        @click="handleSubmit"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { usePlaceDetailWindowStateStore } from '@/store/placeDetailWindowStateStore'
import { defineComponent, ref } from 'vue'
import ColorManager from "@/components/Map/InfoWindow/ColorGrouping/ColorManager.vue"
import { useSavedPlacesStore } from '@/store/savedPlaces'

export default defineComponent({
  setup(props, { emit }) {
    const categoriesStore = useCategoriesStore()
    const placeDetailsDisplayStore = usePlaceDetailWindowStateStore()
    const savedPlacesStore = useSavedPlacesStore()

    const selectedCategory = ref(placeDetailsDisplayStore.inspectedPlace.category)

    const emitCategory = () => {
      emit('input', selectedCategory.value.length ? selectedCategory.value : null)
    }

    const colorManagerOpen = ref(false)
    const isSubmitting = ref(false)

    const handleSubmit = async () => {
      try {
        isSubmitting.value = true
        await savedPlacesStore.patch(placeDetailsDisplayStore.inspectedPlace.place_id, { category: selectedCategory.value })
        emit('success')
      } catch(e) {
        console.error(e)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      selectedCategory,
      emitCategory,
      categoriesStore,
      placeDetailsDisplayStore,
      colorManagerOpen,
      isSubmitting,
      handleSubmit
    }
  },
  components: {
    ColorManager
  }
})
</script>

