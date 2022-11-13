<template>
  <v-chip>
    <v-rating
      readonly
      dense
      half-increments
      :value="rating"
      size="18"
    />
    <span class="mx-2 font-weight-bold" v-text="rating" />
    <span class="font-weight-light" v-if="numberOfReviews">({{numberOfReviews}} review{{numberOfReviews > 1 ? 's' : ''}})</span>
  </v-chip>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    rating: {
      type: Number,
      default: () => 0
    },
    numberOfReviews: {
      type: Number
    }
  }
})
</script>
