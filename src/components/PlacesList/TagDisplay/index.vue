<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "TagDisplay",
  props: {
    value: {
      required: true,
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const isDialogOpen = ref(false)

    return {
      isDialogOpen
    }
  },
})
</script>

<template>
  <
</template>
