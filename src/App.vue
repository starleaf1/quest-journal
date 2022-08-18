<template>
  <v-app>
    <v-overlay v-model="waitingForAuth">
      <v-progress-circular indeterminate color="primary" />
    </v-overlay>
    <router-view v-if="!waitingForAuth" />
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "@/store/authStore"

export default {
  computed: {
    darkMode () {
      return null
    },
    waitingForAuth () {
      const authStore = useAuthStore()
      return authStore.isFetchingAuth
    }
  },
  mounted () {
    onAuthStateChanged(this.$firebase.auth, user => {
      const auth = useAuthStore()
      if (user) {
        auth.storeAuthData(user)
      } else {
        auth.clearAuthData()
      }
    })
  }
}
</script>
