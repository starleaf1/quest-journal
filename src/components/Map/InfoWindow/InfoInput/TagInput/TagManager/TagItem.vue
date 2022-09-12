<template>
  <v-list-item>
    <v-list-item-icon>
      <v-checkbox v-model="internalCheck" />
    </v-list-item-icon>
    <v-list-item-content>
      <span v-if="!isEditing">{{ name }}</span>
      <v-text-field
        v-else
        flat
        single-line
        dense
        clearable
        label="tag-title"
        clear-icon="mdi-cancel"
        append-icon="mdi-check"
        v-model="internalName"
        :loading="isLoading"
        @click:append="handleSubmit"
      />
    </v-list-item-content>
    <v-list-item-action>
      <v-btn v-if="!isEditing" small icon><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn v-else small icon><v-icon>mdi-trash</v-icon></v-btn>
    </v-list-item-action>
    <v-list-item-action-text>
      <span v-if="isEditing">Delete</span>
      <span v-else>Edit</span>
    </v-list-item-action-text>
  </v-list-item>
</template>

<script>
import { doc, setDoc } from '@firebase/firestore'
import { useAuthStore } from '@/store/authStore'
import { mapState } from 'pinia'

export default {
  name: 'TagItem',
  props: {
    'tag-id': {
      required: true,
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useAuthStore, ['uid'])
  },
  data () {
    return {
      isLoading: false,
      isEditing: false,
      internalName: this.name,
      internalCheck: this.checked
    }
  },
  methods: {
    handleEditButtonClick () {
      this.$data.isEditing = true
    },
    async handleSubmit() {
      try {
        this.$data.isLoading = true
        this.$emit('submit')
        doc(this.$firebase.db, `userData/${this.uid}/tags/${this.id}`)
        await setDoc(doc, { name: this.internalname })
        this.$emit('success', {
          id: this.id,
          name: this.$data.internalName
        })
      } catch (e) {
        console.error('[modify-tag-name] Cannot modify tag name', e)
      } finally {
        this.$data.isLoading = false
        this.$data.isEditing = false
      }
    },
    handleCheckedChange(e) {
      console.log('[tag-manager-checked-event]', e)
      this.$emit('change:checkbox', e)
    }
  }
}
</script>
