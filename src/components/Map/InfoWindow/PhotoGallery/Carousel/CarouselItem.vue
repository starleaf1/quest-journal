<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    image: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const src = computed(() => props.image.getUrl())
    return { src }
  },
})
</script>

<template>
  <v-img
    :src="src"
    width="100vw"
    height="100vh"
    contain
  />
</template>
