<template>
  <v-card>
    <v-card-title>Manage Color &amp; Categories</v-card-title>
    <v-card-text>
      <v-data-table
        :items="categories"
        :headers="headers"
      >
        <template #[`item.color`]="{ item }">
          <v-icon :color="item.color">mdi-circle</v-icon>
        </template>
        <template #[`item.category`]="{ item }">
          {{ item.category }}
          <v-menu :close-on-content-click="false">
            <template #activator="{ on }">
              <v-btn icon small v-on="on"><v-icon small>mdi-pencil</v-icon></v-btn>
            </template>
            <ColorEditor :editId="item.id" :value="item" />
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="handleCloseClick" color="primary">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore'
import { mapActions, mapState } from 'pinia'
import ColorEditor from './ColorEditor.vue'
export default {
  name: "ColorManager",
  computed: {
    ...mapState(useCategoriesStore, ["categories"]),
  },
  methods: {
    ...mapActions(useCategoriesStore, ["modify"]),
    handleCloseClick() {
      this.$emit("click:close");
    }
  },
  data() {
    return {
      headers: [
        {
          value: "color",
          text: "Color",
          filterable: false,
        },
        {
          value: "category",
          text: "Category"
        }
      ]
    };
  },
  components: { ColorEditor }
}
</script>
