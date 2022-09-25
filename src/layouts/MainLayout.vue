<template>
  <fragment>
    <v-app-bar
      app
      color="primary"
      dark
      class="align-bottom"
    >
      <v-app-bar-nav-icon @click="handleNavButtonClick"></v-app-bar-nav-icon>
      <h1 class="text-h5">Quest Journal</h1>
      <v-spacer />
      <SearchBox />
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
import SearchBox from "@/components/SearchBox/index.vue";
export default {
  name: 'MainLayout',
  components: {
    ProfileMenu,
    SearchBox
},
  methods: {
    ...mapActions(useMiscStore, { handleNavButtonClick: 'toggleDrawer' })
  }
}
</script>
