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
          <v-row>
            <v-col cols="6">
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
                    <template #activator="{ on: dialog }">
                      <v-tooltip top>
                        <template #activator="{ on: tooltip }">
                          <v-btn icon v-on="{ ...dialog, ...tooltip }"><v-icon>mdi-playlist-edit</v-icon></v-btn>
                        </template>
                        <span>Manage tags</span>
                      </v-tooltip>
                    </template>
                    <TagManager @close="managerOpen = false" />
                  </v-dialog>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-select
                label="Colors"
                :items="categories"
                item-text="category"
                item-value="category"
                v-model="selectedCategory"
              >
                <template #item="{ item }">
                  <div class="d-flex align-center">
                    <div><v-avatar size="16" :color="item.color" /></div>
                    <div class="ml-3" style="width: 100%">{{ item.category }}</div>
                  </div>
                </template>
                <template #append-outer>
                  <v-dialog v-model="colorManagerOpen">
                    <template #activator="{ on: dialog }">
                      <v-tooltip top>
                        <template #activator="{ on: tooltip }">
                          <v-btn icon v-on="{ ...dialog, ...tooltip }"><v-icon>mdi-playlist-edit</v-icon></v-btn>
                        </template>
                        <span>Manage colors &amp; categories</span>
                      </v-tooltip>
                    </template>
                    <ColorManager @close="colorManagerOpen = false" />
                  </v-dialog>
                </template>
              </v-select>
            </v-col>
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
import TagManager from './TagInput/TagManager/index.vue';
import { useSavedPlacesStore } from '@/store/savedPlaces';
import { mapActions, mapState } from 'pinia';
import { useTagsStore } from '@/store/tagsStore';
import { useCategoriesStore } from '@/store/categoriesStore';
import ColorManager from '../ColorGrouping/ColorManager.vue';

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
  },
  components: {
    TagManager,
    ColorManager
}
}
</script>
