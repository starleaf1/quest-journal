<template>
  <v-card>
    <v-card-title>Upload Photos</v-card-title>
    <v-card-text>
      <v-file-input
        v-model="internalValue"
        prepend-icon="mdi-image-multiple"
        label="Photo files"
        multiple
        show-size
        small-chips
        hint="You can upload multiple photos at once"
        accept="image/*"
        :disabled="isUploading"
      >
        <template
          #selection="{ file, index }"
        >
          <v-chip
            small
            label
            close
            @click:close="removeSelection(index)"
          >
            {{ `${file.name} (${simplifyFileSizeDisplay(file)})` }}
          </v-chip>
        </template>
      </v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :loading="isUploading"
        @click="uploadPhotos"
      >
        <v-icon left>mdi-image</v-icon>
        <span>Upload Photos</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { upload } from '@/api/storageApi'

export default {
  name: 'PhotoUploader',
  props: {
    directory: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isUploading: false,
      internalValue: []
    }
  },
  methods: {
    simplifyFileSizeDisplay({ size }) {
      if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`
      if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`
      return `${size} B`
    },
    removeSelection(index) {
      this.$data.internalValue.splice(index, 1)
    },
    async uploadPhotos() {
      this.$data.isUploading = true
      await Promise.all(this.$data.internalValue.map(file => upload(file, this.directory)))
      this.$data.isUploading = false
      this.$emit('finished')
    }
  }
}
</script>
