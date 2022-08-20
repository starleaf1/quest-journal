<template>
  <fragment>
    <v-navigation-drawer
      app
      v-model="navigationOpen"
    >
      <h1 class="text-h4">Hello, World</h1>
    </v-navigation-drawer>
    <v-main><MapLayer /></v-main>
  </fragment>
</template>

<script>
import MapLayer from '@/components/Map/MapLayer.vue';
import { useMiscStore } from '@/store';
// @ is an alias to /src

export default {
    name: "DashboardView",
    computed: {
      navigationOpen: () => {
        const miscStore = useMiscStore()
        return miscStore.drawerOpen
      }
    },
    components: { MapLayer }
}
</script>
