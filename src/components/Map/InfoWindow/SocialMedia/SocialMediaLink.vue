<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    name: {
      type: String,
      required: true,
      default: () => 'Website'
    }
  },
  setup(props) {
    const icon = computed(() => {
      switch (props.name.toLowerCase()) {
        case 'instagram':
          return 'mdi-instagram'
        default:
          return 'mdi-web'
      }
    })

    return { icon }
  },
})
</script>

<template>
  <div class="mt-2">
    <v-btn
      x-large
      outlined
      :color="name"
      :href="url"
      target="_blank"
    >
      <v-icon large left>{{ icon }}</v-icon>
      {{username ?? name}}
    </v-btn>
  </div>
</template>
