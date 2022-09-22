<template>
  <l-layer-group>
    <ColoredMarker
      v-for="place in places"
      :key="place.id"
      :color="color ?? 'black'"
      :place="place"
      @click="handleClickMarker"
    />
  </l-layer-group>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSavedPlacesStore } from '@/store/savedPlaces'
import { useCategoriesStore } from '@/store/categoriesStore'
import ColoredMarker from '@/components/Map/SavedPlacesLayer/ColoredMarker.vue'

export default {
  name: 'ColorGroup',
  components: { ColoredMarker },
  props: {
    color: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState(useSavedPlacesStore, ['savedPlaces'])
  },
  data () {
    return {
      places: []
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['findAllMembers']),
    repopulatePlaces () {
      this.$data.places = this.findAllMembers(this.color)
    },
    handleClickMarker(e) {
      this.$emit('click:marker', e)
    }
  },
  mounted () {
    this.repopulatePlaces()
  },
  watch: {
    savedPlaces: {
      immediate: true,
      handler () {
        console.log('[color-grouping] Modification in savedPlaces. Repopulating...')
        this.repopulatePlaces()
      }
    }
  }
}
</script>
