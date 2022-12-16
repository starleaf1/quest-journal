<template>
  <l-control position="bottomleft">
    <v-btn @click="resetFilters">Reset filters</v-btn>
  </l-control>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useCategoriesStore } from '@/store/categoriesStore';

export default defineComponent({
  setup() {
    const categoriesStore = useCategoriesStore()
    const resetFilters = () => {
      categoriesStore.categoriesInFilter = []
    }

    return { resetFilters }
  },
})
</script>

