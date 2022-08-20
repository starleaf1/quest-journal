<template>
  <fragment>
    <div class="google-map" ref="mapDiv" />
  </fragment>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader"

export default {
  name: 'GoogleMap',
  props: {
    center: {
      required: true,
      type: Object
    },
    markers: {
      type: Array
    },
    zoom: {
      default: () => 10
    }
  },

  computed: {
    googleApiKey () {
      return process.env.VUE_APP_GOOGLE_API_KEY
    }
  },

  async mounted () {
    const loader = new Loader({
      apiKey: this.googleApiKey
    })

    try {
      const google = await loader.load()
      google.maps.Map(this.$refs.mapDiv, )
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
