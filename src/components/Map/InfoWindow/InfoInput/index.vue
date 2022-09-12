<template>
  <v-card>
    <v-form @submit.prevent="handleSaveClick">
      <v-card-title>Save this place</v-card-title>
      <v-card-text>
        <v-textarea :disabled="isSubmitting" outlined v-model="notes" label="Notes" />
        <v-autocomplete :disabled="isSubmitting" single-line outlined label="Tags" v-model="tags">
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
        <v-btn color="primary" type="submit" :loading="isSubmitting">Save</v-btn>
        <v-btn color="primary" :disabled="isSubmitting" text @click.prevent="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import TagManager from './TagInput/TagManager/index.vue';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { mapActions } from 'pinia';

export default {
  name: "InfoInput",
  props: {
    place: {
      required: true,
      type: Object
    }
  },
  data() {
    return ({
      dialogOpen: false,
      managerOpen: false,
      tags: [],
      notes: '',
      isSubmitting: false
    });
  },
  methods: {
    ...mapActions(useSavedPlacesStore, ['append', 'remove']),
    closeDialog() {
      this.$emit('cancel')
    },
    async handleSaveClick() {
      try {
        this.$data.isSubmitting = true
        await this.append({ ...this.place, notes: this.notes, tags: this.tags })
        this.closeDialog()
      } catch (e) {
        console.error('[save-place] Cannot save place', e)
      } finally {
        this.$data.isSubmitting = false
      }
    }
  },
  components: {
    TagManager
  }
}
</script>
