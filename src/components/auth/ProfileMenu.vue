<template>
  <v-menu bottom v-model="open">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar color="accent">
          <span class="text-h5 font-weight-light">{{initials}}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item @click="onLogoutClick">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { useAuthStore } from '@/store/authStore';
import { signOut } from '@firebase/auth';
import { mapActions, mapState } from 'pinia';

export default {
  name: "ProfileMenu",
  computed: {
    ...mapState(useAuthStore, ['user', 'uid', 'isAuthenticated']),
    initials () {
      // const authStore = useAuthStore()
      let names = this.user?.displayName.split(' ')
      if (!names) return
      names.splice(1, names.length - 2)
      return `${names[0].substr(0, 1)}${names[1].substr(0, 1)}`
    }
  },
  data () {
    return ({
      open: false
    })
  },
  methods: {
    ...mapActions(useAuthStore, [
      'clearAuthData', 'storeAuthData'
    ]),
    async onLogoutClick () {
      try {
        await signOut(this.$firebase.auth)
        window.location.href = '/'
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
