<template>
  <fragment>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1 class="text-h5">Quest Journal</h1>
    </v-app-bar>
    <router-view />
  </fragment>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
