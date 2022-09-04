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
import { mapActions } from "pinia"

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
  }
}
</script>
