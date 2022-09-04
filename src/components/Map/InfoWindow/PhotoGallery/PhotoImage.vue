<template>
  <v-img :class="{ 'elevation-2': active }" :src="src" height="300px" :aspect-ratio="image.height / image.width" contain />
</template>

<script>
export default {
  name: 'PhotoImage',
  props: {
    image: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    src () {
      return this.image?.getUrl()
    },
    aspectRatio () {
      return this.image.height / this.image.width
    }
  }
}
</script>
