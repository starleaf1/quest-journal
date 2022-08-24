<template>
  <v-dialog :value="open" @click:outside="handleCloseDialog">
    <v-sheet>
      <v-toolbar>
        <h5 class="text-h6">{{place.name}}</h5>
        <v-spacer />
        <v-btn color="primary">
          <v-icon left>mdi-pin</v-icon>
          <span>Add marker</span>
        </v-btn>
        <v-btn icon color="primary">
          <v-icon>mdi-navigation</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p class="text-body2">{{place.formatted_address}}</p>
      </v-card-text>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: 'PlaceDetailsDialog',
  props: {
    open: {
      default: () => false
    },
    place: {
      default: () => ({})
    }
  },
  methods: {
    handleCloseDialog() {
      this.$emit('click:outside')
    }
  }
}
</script>
