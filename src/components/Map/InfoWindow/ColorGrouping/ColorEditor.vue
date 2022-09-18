<template>
  <v-card>
    <v-form @submit.prevent="handleSubmit">
      <v-card-title>{{editId ? 'Edit' : 'New'}} Color</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="internalCategory"
          label="Label"
        >
          <template #append-outer>
            <v-btn
              type="submit"
              color="primary"
              icon
              :loading="isSubmitting"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { useAuthStore } from '@/store/authStore'
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/store/categoriesStore'

export default {
  name: 'ColorEditor',
  props: {
    editId: {
      type: String,
      required: false
    },
    value: {
      validator(v) {
        return (
          typeof v?.color === 'string' &&
          typeof v?.name === 'string'
        )
      },
      default: () => ({
        color: '#00000000',
        category: ''
      })
    }
  },
  computed: {
    ...mapState(useAuthStore, ['uid'])
  },
  data () {
    return {
      internalColor: this.value.color,
      internalCategory: this.value.category,
      isSubmitting: false
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['modify']),
    async handleSubmit() {
      try {
        this.$data.isSubmitting = true
        if (this.editId) {
          await this.modify(this.editId, { color: this.$data.internalColor, category: this.$data.internalCategory })
        } else {
          await this.add({ color: this.$data.internalColor, category: this.$data.internalCategory })
        }
        this.$emit('close')
      } catch(e) {
        console.error('[color-editor] Failed to save data', e)
      } finally {
        this.$data.isSubmitting = false
      }
      this.$emit('submit')
    }
  }
}
</script>
