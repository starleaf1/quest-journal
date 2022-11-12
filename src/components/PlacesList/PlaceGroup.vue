<template>
  <v-list-group :value="false">
    <template #activator>
      <v-list-item-title>
        {{ category.name }}
      </v-list-item-title>
    </template>
    <template #prependIcon>
      <v-avatar size="20px" :color="myColor ?? '#000000'">&nbsp;</v-avatar>
    </template>
    <PlaceItem
      v-for="place in category.places"
      :key="place.id"
      :place="place"
    />
  </v-list-group>
</template>

<script>
import { useCategoriesStore } from '@/store/categoriesStore';
import PlaceItem from './PlaceItem.vue';
import { mapState } from 'pinia';

export default {
  name: "PlaceGroup",
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState(useCategoriesStore, ['categories']),
    myColor () {
      return this.categories.find(v => 
        this.category.name === v.category
      )?.color
    }
  },
  components: { PlaceItem }
}
</script>
