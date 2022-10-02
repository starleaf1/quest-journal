<template>
  <v-select
    label="Colors"
    :items="categories"
    item-text="category"
    item-value="category"
    outlined
    dense
    :value="value"
    v-on="$listeners"
  >
    <template #item="{ item }">
      <div class="d-flex align-center">
        <div><v-avatar size="16" :color="item.color" /></div>
        <div class="ml-3" style="width: 100%">{{ item.category }}</div>
      </div>
    </template>
    <template #append-outer>
      <v-dialog v-model="colorManagerOpen">
        <template #activator="{ on: dialog }">
          <v-tooltip top>
            <template #activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...dialog, ...tooltip }"><v-icon>mdi-playlist-edit</v-icon></v-btn>
            </template>
            <span>Manage colors &amp; categories</span>
          </v-tooltip>
        </template>
        <ColorManager @close="colorManagerOpen = false" />
      </v-dialog>
    </template>
  </v-select>
</template>

<script>
import { mapState } from 'pinia'
import { useCategoriesStore } from '@/store/categoriesStore'
import ColorManager from './ColorManager.vue'

export default {
  name: 'ColorInput',
  components: {
    ColorManager
  },
  props: {
    value: Object
  },
  computed: {
    ...mapState(useCategoriesStore, ['categories'])
  },
  data () {
    return { colorManagerOpen: false }
  }
}
</script>
