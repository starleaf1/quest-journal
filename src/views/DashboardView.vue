<template>
  <fragment>
    <v-navigation-drawer
      app
      v-model="drawerOpen"
    >
      <h1 class="text-h4">Hello, World</h1>
    </v-navigation-drawer>
    <v-main><MapLayer /></v-main>
  </fragment>
</template>

<script>
import MapLayer from '@/components/Map/MapLayer.vue';
import { useMiscStore } from '@/store';
import { mapState } from "pinia"
// @ is an alias to /src

export default {
    name: "DashboardView",
    computed: {
      ...mapState(useMiscStore, ['drawerOpen'])
    },
    components: { MapLayer }
}
</script>
