<template>
  <v-card>
    <v-form>
      <v-card-title>{{ editId ? 'Edit' : 'New'}} Tag</v-card-title>
      <v-card-text>
        <v-text-field
          label="Name"
          v-model="internalName"
          :disabled="isSubmitting"
        >
          <template #append-outer>
            <v-btn
              icon
              :disabled="internalName.length <= 0"
              :loading="isSubmitting"
              @click="handleOkClick"
            ><v-icon>mdi-check</v-icon></v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'pinia'
import { useTagsStore } from '@/store/tagsStore'

export default {
  name: 'NewTag',
  props: {
    editId: {
      type: String
    },
    name: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    ...mapActions(useTagsStore, ['append', 'remove', 'edit']),
    async handleOkClick() {
      try {
        this.$data.isSubmitting = true
        if (!this.editId) {
          await this.append({
            name: this.$data.internalName
          })
        } else {
          await this.edit(this.editId, this.$data.internalName)
        }
        this.$emit('submit')
        this.$destroy()
      } catch (e) {
        this.$emit('error')
        console.error(e)
        this.$data.error = e.message
      } finally {
        this.$data.isSubmitting = false
      }
    },
    handleCancelClick() {
      this.$emit('cancel')
    }
  },
  data () {
    return ({
      internalName: this.name,
      isSubmitting: false,
      error: false
    })
  }
}
</script>
