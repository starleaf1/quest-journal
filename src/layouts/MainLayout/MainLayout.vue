<template>
  <fragment>
    <v-app-bar
      app
      color="primary"
      dark
      class="align-center justify-space-between"
    >
      <v-app-bar-nav-icon @click="handleNavButtonClick"></v-app-bar-nav-icon>
      <SearchBox />
      <ProfileMenu />
    </v-app-bar>
    <router-view />
  </fragment>
</template>

<script>
import ProfileMenu from "@/components/auth/ProfileMenu.vue";
import { useMiscStore } from '@/store';
import SearchBox from "@/components/SearchBox/index.vue";
import { defineComponent } from 'vue'

export default defineComponent({
  name: "MainLayout",
  setup() {
    const miscStore = useMiscStore()
    const handleNavButtonClick = miscStore.toggleDrawer

    return { handleNavButtonClick }
  },
  components: { ProfileMenu, SearchBox }
})
</script>

