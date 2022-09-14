<template>
  <fragment>
    <v-navigation-drawer
      app
      v-model="drawerOpen"
    >
      <PlacesList />
    </v-navigation-drawer>
    <v-main><MapLayer /></v-main>
  </fragment>
</template>

<script>
import MapLayer from '@/components/Map/MapLayer.vue';
import { useMiscStore } from '@/store';
import { mapState } from "pinia"
import PlacesList from '@/components/PlacesList/index.vue';
// @ is an alias to /src

export default {
    name: "DashboardView",
    computed: {
      ...mapState(useMiscStore, ['drawerOpen'])
    },
    components: { MapLayer, PlacesList }
}
</script>
