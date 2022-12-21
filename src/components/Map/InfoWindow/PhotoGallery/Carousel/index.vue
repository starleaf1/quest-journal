<script>
import { defineComponent, ref, watch } from 'vue'
import CarouselItem from "./CarouselItem.vue"

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
    const currentActive = ref(props.active ?? 0)

    watch(currentActive, (v) => {
      emit("change:active", v)
    })
    
    const handleCloseClick = () => {
      emit("cancel")
    }

    return { currentActive, handleCloseClick }
  },
  components: { CarouselItem }
})
</script>

<template>
  <v-overlay :opacity="0.9" :value="value">
    <v-btn class="mt-5" small fab absolute left depressed @click.stop="handleCloseClick">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-carousel height="100vh" v-model="currentActive" mandatory>
      <v-carousel-item v-for="image in images" :key="image.src">
        <CarouselItem :image="image" />
      </v-carousel-item>
    </v-carousel>
  </v-overlay>
</template>
