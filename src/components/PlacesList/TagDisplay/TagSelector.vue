<script>
import { computed, defineComponent } from 'vue'
import { useTagFilterStore, useTagsStore } from '@/store/tagsStore';

export default defineComponent({
  setup() {
    const tagFilterStore = useTagFilterStore()
    const tagStore = useTagsStore()

    const tagFilters = computed({
      get: () => tagFilterStore.tagFilters,
      set(v) { tagFilterStore.tagFilters = v }
    })
    const availableTags = computed(() => tagStore.tags)

    return {
      tagFilters, availableTags
    }
  },
})
</script>

<template>
  <v-card>
    <v-card-title>Filter by tags</v-card-title>
    <v-card-text>
      <v-chip-group
        multiple
        column
        v-model="tagFilters"
      >
        <v-chip
          v-for="tag in tagFilters"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" text>Reset</v-btn>
      <v-btn color="primary" text>Apply</v-btn>
    </v-card-actions>
  </v-card>
</template>
