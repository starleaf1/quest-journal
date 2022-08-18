<template>
  <fragment>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1 class="text-h5">Quest Journal</h1>
      <v-spacer />
      <ProfileMenu />
    </v-app-bar>
    <router-view />
  </fragment>
</template>

<script>
import ProfileMenu from "@/components/auth/ProfileMenu.vue";
export default {
  name: 'MainLayout',
  components: {
    ProfileMenu
  }
}
</script>
