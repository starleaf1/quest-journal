<template>
  <v-card @click="$emit('click')">
    <v-img
      :src="src"
      height="200"
      max-width="400"
      v-on="$listeners"
    >
    </v-img>
  </v-card>
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
