<template>
  <v-card>
    <v-card-title>Delete place</v-card-title>
    <v-card-text>
      Do you want to remove this place from your saved places list?
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        @click="handleCancelButtonClick"
        text
      >
        Cancel
      </v-btn>
      <v-btn
        @click="handleDeleteButtonClick"
        text
        color="error"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(props, { emit }) {
    const handleDeleteButtonClick = () => {
      emit('submit')
    }
    const handleCancelButtonClick = () => {
      emit('cancel')
    }

    return { handleCancelButtonClick, handleDeleteButtonClick }
  },
})
</script>

