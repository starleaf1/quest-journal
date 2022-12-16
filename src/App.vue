<template>
  <v-app>
    <SplashScreen :value="isFetchingAuth" />
    <router-view v-if="!isFetchingAuth" />
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "@/store/authStore"
import { mapActions, mapState } from "pinia"
import SplashScreen from "@/components/app/SplashScreen.vue"

export default {
  computed: {
    darkMode () {
      return null
    },
    ...mapState(useAuthStore, ['isAuthenticated', 'isFetchingAuth', 'user'])
  },
  methods: {
    ...mapActions(useAuthStore, ['storeAuthData', 'clearAuthData']),
  },
  mounted () {
    onAuthStateChanged(this.$firebase.auth, user => {
      if (user) {
        this.storeAuthData(user)
      } else {
        this.clearAuthData()
      }
    })
  },
  components: {
    SplashScreen
  }
}
</script>
