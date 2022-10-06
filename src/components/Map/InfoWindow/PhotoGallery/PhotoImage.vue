<template>
  <v-img
    class="ma-2 align-end justify-center"
    :class="{ 'elevation-4': active }"
    :src="src"
    height="300"
    max-width="300"
    v-on="$listeners"
  >
  </v-img>
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
    }
  }
}
</script>
