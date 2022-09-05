<template>
  <v-dialog v-model="dialogOpen">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-on="on" v-bind="attrs" />
    </template>
    <v-sheet>
      <v-toolbar>
        <v-btn icon>
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
        <v-toolbar-title>Save to your collection</v-toolbar-title>
      </v-toolbar>
      <v-form>

      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: 'InfoInputDialog',
  data () {
    return ({
      dialogOpen: false
    })
  },
  methods: {
    closeDialog () {
      this.$data.dialogOpen = false
    }
  }
}
</script>
