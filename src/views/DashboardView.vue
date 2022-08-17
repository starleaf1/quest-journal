<template>
  <fragment>
    <v-navigation-drawer
      app
      v-model="navigationOpen"
    >
      <h1 class="text-h4">Hello, World</h1>
    </v-navigation-drawer>
    <router-view />
  </fragment>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'DashboardView',
  data () {
    return {
      navigationOpen: true
    }
  }
}
</script>
