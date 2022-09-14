<template>
  <v-img :class="{ 'elevation-2': active }" :src="src" height="300" max-width="300" />
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
