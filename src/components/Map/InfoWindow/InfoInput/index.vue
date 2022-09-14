<template>
  <v-card>
    <v-form @submit.prevent="handleSaveClick">
      <v-card-title>Save this place</v-card-title>
      <v-card-text>
        <v-textarea :disabled="isSubmitting" outlined v-model="notes" label="Notes" />
        <v-autocomplete
          label="Tags"
          :disabled="isSubmitting"
          :items="tags"
          item-text="name"
          item-value="name"
          v-model="tagsForPlace"
          chips
          multiple
        >
          <template #append-outer>
            <v-dialog v-model="managerOpen">
              <template #activator="{ on }">
                <v-btn text v-on="on"><v-icon left>mdi-list-status</v-icon>Manage</v-btn>
              </template>
              <TagManager @close="managerOpen = false" />
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
import { mapActions, mapState } from 'pinia';
import { useTagsStore } from '@/store/tagsStore';

export default {
  name: "InfoInput",
  props: {
    place: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState(useTagsStore, ['tags'])
  },
  data() {
    return ({
      dialogOpen: false,
      managerOpen: false,
      tagsForPlace: [],
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
        await this.append({ ...this.place, notes: this.notes, tags: this.$data.tagsForPlace })
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
