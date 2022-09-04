<template>
  <v-btn v-bind="$attrs" @click="handleClick">
    <v-icon left>mdi-google</v-icon>
    <span>Continue with Google</span>
  </v-btn>
</template>

<script>
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from '@firebase/auth'
import { useAuthStore } from '@/store/authStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'LoginWithGoogleButton',
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'user', 'uid', 'originalDestination']),
  },
  methods: {
    ...mapActions(useAuthStore, ['storeAuthData', 'clearAuthData', 'clearOriginalDestination']),
    handleClick () {
      const provider = new GoogleAuthProvider()
      signInWithRedirect(this.$firebase.auth, provider)
    }
  },
  async mounted () {
    try {
      const redirectResult = await getRedirectResult(this.$firebase.auth)
      if (redirectResult?.user) {
        // authStore.storeAuthData(redirectResult.user)
        const originalDestination = this.originalDestination ?? '/'
        this.clearOriginalDestination = null
        console.log('[google-login] Login complete.', this.isAuthenticated)
        console.log('[google-login] Redirecting to', originalDestination)
        window.location.href = originalDestination ?? '/'
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
