<template>
  <v-card>
    <v-card-title>Manage Color &amp; Categories</v-card-title>
    <v-card-text>
      <v-data-table
        :items="categories"
      >
        <template #[`item.color`]="{ item }">
          <v-chip :color="item.color">&nbsp;</v-chip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { mapActions } from 'pinia'
export default {
  name: 'ColorManager',
  computed: {
    ...mapState(useCategoriesStore, ['categories']),
  },
  methods: {
    ...mapActions(useCategoriesStore, ['modify'])
  }
}
</script>
