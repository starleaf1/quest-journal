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
import {
  computed,
  defineComponent,
  ref,
  watch
} from 'vue';

export default defineComponent({
  name: "PlaceGroup",
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  setup (props, { emit }) {
    const categoriesStore = useCategoriesStore()
    const myCategory = computed(() => categoriesStore.categories.find(v => props.category.name === v.category) ?? null)
    const myColor = computed(() => myCategory.value?.color)

    const open = ref(false)

    watch(open, () => {
      emit('change:open', {
        open: open.value,
        category: myCategory.value
      })
    })

    categoriesStore.$subscribe((mutation, state) => {
      if (!state.categoriesInFilter.length) {
        open.value = false
      }
    })

    return {
      myCategory,
      myColor,
      open
    }
  },
  components: {
    PlaceItem
  }
})
</script>
