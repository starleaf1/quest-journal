<template>
  <fragment>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="handleNavButtonClick"></v-app-bar-nav-icon>
      <h1 class="text-h5">Quest Journal</h1>
      <v-spacer />
      <ProfileMenu />
    </v-app-bar>
    <router-view />
  </fragment>
</template>

<script>
import ProfileMenu from "@/components/auth/ProfileMenu.vue";
import { useMiscStore } from '@/store';
import { mapActions } from 'pinia'
export default {
  name: 'MainLayout',
  components: {
    ProfileMenu
  },
  methods: {
    ...mapActions(useMiscStore, { handleNavButtonClick: 'toggleDrawer' })
  }
}
</script>
