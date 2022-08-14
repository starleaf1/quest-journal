<template>
  <fragment>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </fragment>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
