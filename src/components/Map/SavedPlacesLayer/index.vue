<template>
  <fragment>
    <ColorGroup
      v-for="color in categories"
      :key="color.id"
      :color="color.category"
    />
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/store/categoriesStore';
import ColorGroup from './ColorGroup.vue';

export default {
  name: "SavedPlacesMarker",
  computed: {
    ...mapState(useCategoriesStore, ["categories"])
  },
  methods: {
    handleMarkerClick(e) {
      this.$emit('click:marker', e)
    },
    ...mapActions(useCategoriesStore, ['findAllMembers'])
  },
  components: { ColorGroup },
}
</script>
