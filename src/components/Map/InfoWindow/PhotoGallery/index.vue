<template>
  <v-slide-group
    :show-arrows="true"
  >
    <v-slide-item :active="active" v-for="(image, n) in images" :key="n" #default="{ active }">
      <PhotoImage :image="image" :active="active" />
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
  mounted () {
    console.debug('This place has gallery.', this.images)
  }
}
</script>
