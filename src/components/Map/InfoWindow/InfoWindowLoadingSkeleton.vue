<template>
  <fragment>
    <div class="my-1">
      <v-skeleton-loader
        type="image"
      />
    </div>
    <div class="my-1">
      <v-skeleton-loader
        type="actions"
      />
    </div>
    <div class="my-1">
      <v-skeleton-loader
        type="paragraph"
      />
    </div>
  </fragment>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'InfoWindowLoadingSkeleton',
  setup() {
    
  },
})
</script>

