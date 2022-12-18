<script>
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: "GalleryCarousel",
  props: {
    images: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: () => false
    },
    active: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const currentActive = ref(props.value ?? 0)

    watch(currentActive.value, (v) => {
      emit("change:active", v)
    })

    return { currentActive }
  },
})
</script>

<template>
  <v-overlay :value="value">
    <v-carousel v-model="currentActive" mandatory>
      <v-carousel-item v-for="image in images" :key="image.src">
        <v-img
          :src="image.src"
          height="200"
          max-width="400"
        />
      </v-carousel-item>
    </v-carousel>
  </v-overlay>
</template>
