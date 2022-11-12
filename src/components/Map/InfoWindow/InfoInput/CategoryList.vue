<template>
  <v-list>
    <v-list-item
      v-for="category in categoryStore.categories"
      :key="category.id"
      @click="emitValue(category.category)"
    >
      <v-list-item-icon>
        <v-icon :color="category.color">mdi-circle</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-text v-text="category.category" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const categoryStore = useCategoriesStore()

    const emitValue = (category) => {
      emit('input', category)
    }

    return { categoryStore, emitValue }
  },
})
</script>

