<template>
  <div>
    <v-slide-group
      :show-arrows="true"
      v-model="activePhoto"
    >
      <v-slide-item
        v-for="(image, n) in images"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <PhotoImage
          :image="image"
          :active="active"
          @click="toggle"
        />
      </v-slide-item>
    </v-slide-group>
    <div class="text-center">
      <v-dialog v-model="isUploaderDialogOpen">
        <template #activator="{ on: dialog }">
          <v-tooltip top>
            <template #activator="{ on: tooltip }">
              <v-btn
                outlined
                color="primary"
                v-on="{ ...dialog, ...tooltip }"
              >
                <v-icon left>mdi-image-plus</v-icon>
                <span>Upload Image</span>
              </v-btn>
            </template>
            <span>Upload your own image</span>
          </v-tooltip>
        </template>
        <PhotoUploader
          :directory="storageDirectory"
          @finished="isUploaderDialogOpen = false"
        />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import PhotoImage from './PhotoImage.vue';
import PhotoUploader from "@/components/common/PhotoUploader"
import { mapState } from 'pinia';
import { useAuthStore } from '@/store/authStore';
import { usePlaceDetailWindowStateStore } from '@/store/placeDetailWindowStateStore';

export default {
  name: 'PhotoGallery',
  components: {
    PhotoImage,
    PhotoUploader
  },
  computed: {
    ...mapState(useAuthStore, ['uid']),
    ...mapState(usePlaceDetailWindowStateStore, ['inspectedPlace']),
    storageDirectory () {
      return `uploads/${this.uid}/images/places/${this.inspectedPlace.place_id}`
    }
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return ({
      activePhoto: 0,
      isUploaderDialogOpen: false
    })
  }
}
</script>
