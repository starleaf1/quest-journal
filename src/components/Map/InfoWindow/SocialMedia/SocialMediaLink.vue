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
          return 'mdi-facebook'
        default:
          return 'mdi-web'
      }
    })

    const color = computed(() => {
      switch (props.name.toLowerCase()) {
        case 'instagram':
          return '#e1306c'
        case 'whatsapp':
          return '#25d366'
        case 'facebook':
          return '#4267B2'
        case 'youtube':
          return '#f00'
        default:
          return 'primary'
      }
    })

    return { icon, color }
  },
})
</script>

<template>
  <v-btn
    class="mb-2 mb-lg-0 mr-0 mr-lg-2"
    :color="color"
    outlined
    :href="url"
    target="_blank"
    tile
    :block="!isOnPC"
  >
    <v-icon left>{{ icon }}</v-icon>
    {{username.length ? username : name}}
  </v-btn>
</template>
