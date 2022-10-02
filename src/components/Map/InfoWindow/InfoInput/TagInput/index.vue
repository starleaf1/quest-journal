<template>
  <v-autocomplete
    label="Tags"
    outlined
    :items="tags"
    item-text="name"
    item-value="name"
    small-chips
    multiple
    dense
    :value="value"
    v-bind="$props"
    v-on="$listeners"
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
</template>

<script>
  import { mapState } from 'pinia'
  import TagManager from './TagManager'
  import { useTagsStore } from '@/store/tagsStore'

  export default {
    name: 'TagInput',
    components: { TagManager },
    props: {
      value: Array,
      disabled: Boolean
    },
    computed: {
      ...mapState(useTagsStore, ['tags'])
    },
    data () {
      return {
        managerOpen: false
      }
    }
  }
</script>
