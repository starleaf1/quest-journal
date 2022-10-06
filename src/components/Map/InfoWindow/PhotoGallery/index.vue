<template>
  <v-slide-group
    :show-arrows="true"
    v-model="activePhoto"
  >
    <v-slide-item
      v-for="(image, n) in images"
      :key="n"
      v-slot="{ active, toggle }"
    >
      <PhotoImage
        :image="image"
        :active="active"
        @click="toggle"
      />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import PhotoImage from './PhotoImage.vue';

export default {
  name: 'PhotoGallery',
  components: {
    PhotoImage
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return ({ activePhoto: 0 })
  }
}
</script>
