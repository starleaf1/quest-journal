<template>
  <v-card>
    <v-form>
      <v-card-title>Save this place</v-card-title>
      <v-card-text>
        <v-textarea outlined v-model="notes" label="Notes" />
        <v-autocomplete single-line outlined label="Tags" v-model="tags">
          <template #append-outer>
            <v-dialog v-model="managerOpen">
              <template #activator="{ on }">
                <v-btn v-on="on"><v-icon left>mdi-list-status</v-icon>Manage</v-btn>
              </template>
              <TagManager />
            </v-dialog>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Save</v-btn>
        <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import TagManager from './TagInput/TagManager/index.vue';

export default {
  name: "InfoInput",
  data() {
    return ({
      dialogOpen: false,
      managerOpen: false,
      tags: [],
      notes: ''
    });
  },
  methods: {
    closeDialog() {
      this.$emit('cancel')
    }
  },
  components: {
    TagManager
  }
}
</script>
