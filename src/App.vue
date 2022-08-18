<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "@/store/authStore"

export default {
  computed: {
    darkMode () {
      return null
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
