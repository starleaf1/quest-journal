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
import PlacesList from '@/components/PlacesList/index.vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: "DashboardView",
  setup () {
    const miscStore = useMiscStore()
    
    const drawerOpen = computed({
      get: () => (miscStore.drawerOpen),
      set: v => {
        miscStore.drawerOpen = v 
      }
    })

    return drawerOpen
  },
  components: { MapLayer, PlacesList }
})

</script>
