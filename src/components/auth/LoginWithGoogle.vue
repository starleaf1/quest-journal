<template>
  <v-btn v-bind="$attrs" @click="handleClick">
    <v-icon left>mdi-google</v-icon>
    <span>Continue with Google</span>
  </v-btn>
</template>

<script>
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from '@firebase/auth'
import { useAuthStore } from '@/store/authStore'
export default {
  name: 'LoginWithGoogleButton',
  methods: {
    handleClick () {
      const provider = new GoogleAuthProvider()
      signInWithRedirect(this.$firebase.auth, provider)
    }
  },
  async mounted () {
    const authStore = useAuthStore()
    try {
      const redirectResult = await getRedirectResult(this.$firebase.auth)
      if (redirectResult?.user) {
        authStore.storeAuthData(redirectResult.user)
        const originalDestination = authStore.originalDestination ?? '/'
        authStore.originalDestination = null
        console.log('[google-login] Login complete.', authStore.isAuthenticated)
        console.log('[google-login] Redirecting to', originalDestination)
        window.location.href = originalDestination ?? '/'
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
