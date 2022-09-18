<template>
  <fragment>
    <v-subheader>{{ category.name }}</v-subheader>
    <v-list-item-group>
      <PlaceItem
        v-for="place in category.places"
        :key="place.id"
        :place="place"
      />
    </v-list-item-group>
    <v-divider />
  </fragment>
</template>

<script>
import PlaceItem from './PlaceItem.vue';

export default {
  name: "PlaceGroup",
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  components: { PlaceItem }
}
</script>
