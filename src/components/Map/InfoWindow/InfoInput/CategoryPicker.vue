<template>
  <v-card>
    <v-card-title>Pick a category</v-card-title>
    <v-card-text>
      <v-radio-group v-model="selectedCategory">
        <v-radio
          v-for="category in categoriesStore.categories"
          :key="category.category"
          :value="category.category"
        >
          <template #label>
            <span>{{category.category}}</span>
            <v-icon x-small right :color="category.color">mdi-circle</v-icon>
          </template>
        </v-radio>
        <v-radio
          :value="null"
        >
          <template #label>
            <span>Uncategorized</span>
            <v-icon x-small right color="#000">mdi-circle</v-icon>
          </template>
        </v-radio>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-btn text>Manage</v-btn>
      <v-spacer />
      <v-btn color="primary">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const categoriesStore = useCategoriesStore()
    const selectedCategory = ref(null)
    const emitCategory = () => {
      return emit('input', selectedCategory.value)
    }
    return { selectedCategory, emitCategory, categoriesStore }
  },
})
</script>

