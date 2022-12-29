<script>
import { defineComponent, ref } from "vue"
import TagSelector from "./TagSelector.vue"

export default defineComponent({
  name: "TagDisplay",
  props: {
    value: {
      required: true,
      type: Array,
      default: () => [],
    }
  },
  setup() {
    const isDialogOpen = ref(false)

    return {
      isDialogOpen
    }
  },
  components: { TagSelector }
})
</script>

<template>
  <v-dialog v-model="isDialogOpen">
    <TagSelector />
  </v-dialog>
</template>
