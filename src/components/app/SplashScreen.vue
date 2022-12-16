<template>
  <v-overlay :value="value">
    <v-sheet
      class="d-flex flex-column justify-center align-center"
      width="100vw"
      height="100vh"
      color="white"
    >
      <div class="pb-10">
        <v-img src="../../../public/img/icons/app-logo.png" height="60vw" contain />
      </div>
      <div class="wrapper">
        <v-progress-linear indeterminate color="primary" />
      </div>
    </v-sheet>
  </v-overlay>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: "SplashScreen",
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>

<style scoped>
.wrapper {
  width: 100px;
}
</style>
