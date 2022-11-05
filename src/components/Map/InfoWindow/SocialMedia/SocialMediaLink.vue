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
        case 'youtube':
          return 'mdi-youtube'
        case 'whatsapp':
          return 'mdi-whatsapp'
        case 'facebook':
          return 'mdi-youtube'
        default:
          return 'mdi-web'
      }
    })

    return { icon }
  },
})
</script>

<template>
  <v-btn
    outlined
    :color="name"
    :href="url"
    target="_blank"
    tile
    :block="!isOnPC"
  >
    <v-icon left>{{ icon }}</v-icon>
    {{username.length ? username : name}}
  </v-btn>
</template>
