<template>
  <v-card>
    <v-form @submit.prevent="handleSaveClick">
      <v-card-title>Save this place</v-card-title>
      <v-card-text>
        <v-container
          fluid
          class="fill-height"
        >
          <v-row>
            <v-textarea
            :disabled="isSubmitting"
            outlined
            v-model="notes"
            label="Notes"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit" :loading="isSubmitting">Save</v-btn>
        <v-btn color="primary" :disabled="isSubmitting" text @click.prevent="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { mapActions, mapState } from 'pinia';
import { useTagsStore } from '@/store/tagsStore';
import { useCategoriesStore } from '@/store/categoriesStore';

export default {
  name: "InfoInput",
  props: {
    place: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState(useTagsStore, ['tags']),
    ...mapState(useCategoriesStore, ['categories'])
  },
  data() {
    return ({
      dialogOpen: false,
      managerOpen: false,
      colorManagerOpen: false,
      tagsForPlace: [],
      notes: '',
      selectedCategory: null,
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
        await this.append({
          ...this.place,
          notes: this.notes,
          tags: this.$data.tagsForPlace,
          category: this.$data.selectedCategory
        })
        this.closeDialog()
      } catch (e) {
        console.error('[save-place] Cannot save place', e)
      } finally {
        this.$data.isSubmitting = false
      }
    }
  }
}
</script>
