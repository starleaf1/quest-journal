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
        window.location.href = authStore.originalDestination ?? '/'
        authStore.originalDestination = null
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
