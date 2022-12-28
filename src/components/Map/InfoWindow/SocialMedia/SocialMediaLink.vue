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
        case 'booking.com':
          return '#003b95'
        case 'traveloka':
          return '#1ba0e2'
        case 'agoda':
        case 'tripadvisor':
        case 'tiket.com':
          return '#fff'
        default:
          return 'primary'
      }
    })

    const bigLogoSrc = computed(() => {
      const logos = [
        { name: "booking.com", src: require("@/assets/logo/booking_com_blue.png") },
        { name: "traveloka", src: require("@/assets/logo/traveloka-official-logo-resmi-white-new.webp") },
        { name: "agoda", src: require("@/assets/logo/agoda_mainlogo_horizontal_positive_ai_Logo without circles.png") },
        { name: "tripadvisor", src: require("@/assets/logo/Tripadvisor_Logo_horizontal-lockup_registered_RGB.svg") },
        { name: "tiket.com", src: require("@/assets/logo/Tiket.com Logo (SVG-1080p) - FileVector69.svg")}
      ]

      return logos.find(logo => props.name.toLowerCase() === logo.name)?.src
    })

    return { icon, color, bigLogoSrc }
  },
})
</script>

<template>
  <v-btn
    class="mb-2 mb-lg-0 mr-0 mr-lg-2"
    :color="color"
    :outlined="!bigLogoSrc"
    :href="url"
    target="_blank"
    tile
    :block="!isOnPC"
  >
    <img class="big-btn" v-if="bigLogoSrc" :src="bigLogoSrc" />
    <fragment v-else>
      <v-icon left>{{ icon }}</v-icon>
      {{username.length ? username : name}}
    </fragment>
  </v-btn>
</template>

<style lang="scss" scoped>
  @import '~vuetify/src/components/VBtn/_variables.scss';
  
  .big-btn {
    height: map-get($btn-sizes, "default")+px;
    object-fit: contain;
  }
</style>
