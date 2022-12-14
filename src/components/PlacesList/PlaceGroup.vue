<template>
  <v-list-group v-model="open">
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
    myCategory () {
      return this.categories.find(v => this.category.name === v.category)
    },
    myColor () {
      return this.myCategory?.color
    }
  },
  data () {
    return ({
      open: false
    })
  },
  watch: {
    open () {
      this.$emit('change:open', {
        open: this.$data.open,
        category: this.myCategory
      })
    }
  },
  components: { PlaceItem }
}
</script>
