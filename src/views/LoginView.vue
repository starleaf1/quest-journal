<template>
  <div class="filler d-flex align-center justify-center fill-height">
    <v-sheet width="500" class="pa-4">
      <h2 class="text-h4">Log In</h2>
      <div class="my-3 text-center">
        <v-form @submit.prevent="login">
          <v-text-field label="E-mail" v-model="username" outlined />
          <v-text-field label="Password" v-model="password" outlined />
          <v-btn block color="primary">Login</v-btn>
        </v-form>
      </div>
      <div>
        <v-btn dark block color="blue">
          <v-icon left>mdi-google</v-icon>
          <span>Continue with Google</span>
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return ({
      email: '',
      password: ''
    })
  },
  methods: {
    login () {
      return
    }
  }
}
</script>

<style scoped>
.filler {
  height: 100%
}
</style>
