<template>
  <v-card>
    <v-form>
      <v-card-title>New Tag</v-card-title>
      <v-card-text>
        <v-text-field
          label="Name"
          :disabled="isSubmitting"
        >
          <template #append-outer>
            <v-btn
              icon
              :disabled="name.length > 0"
              :loading="isSubmitting"
              @click="handleOkClick"
            ><v-icon>mdi-check</v-icon></v-btn>
            <v-btn icon @click="handleCancelClick"><v-icon>mdi-close</v-icon></v-btn>
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
  methods: {
    ...mapActions(useTagsStore, ['append', 'remove']),
    async handleOkClick() {
      try {
        this.$data.isSubmitting = true
        await this.append({
          name: this.$data.name
        })
        this.$emit('submit')
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
      name: '',
      isSubmitting: false,
      error: false
    })
  }
}
</script>
