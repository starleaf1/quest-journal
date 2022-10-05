<template>
  <fragment>
    <ColorGroup
      v-for="color in categories"
      :key="color.id"
      :color="color.id"
      @click:marker="handleMarkerClick"
    />
    <ColorGroup
      :color="null"
      @click:marker="handleMarkerClick"
    />
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/store/categoriesStore';
import ColorGroup from './ColorGroup.vue';

export default {
  name: "SavedPlacesMarkers",
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
