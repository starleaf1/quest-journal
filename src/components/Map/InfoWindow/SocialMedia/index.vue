<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { Fragment as fragment } from 'vue-fragment'
import SocialMediaInput from './SocialMediaInput.vue'
import SocialMediaLink from './SocialMediaLink.vue'

export default defineComponent({
  name: "SocialMedia",
  props: {
    value: Object
  },
  setup(props, { emit }) {
    const internalValue = ref(props.value ?? {});
    const editMode = ref(false);

    watchEffect(() => {
      emit('input', { ...internalValue.value })
    })
    watchEffect(() => {
      emit('change:edit-mode', editMode.value)
    })

    return { internalValue, editMode }
  },
  components: {
    fragment,
    SocialMediaInput,
    SocialMediaLink
  }
})
</script>

<template>
  <fragment>
    <v-toolbar-items>
      <v-toolbar-title class="justify-center">Links &amp; Social Media</v-toolbar-title>
      <div class="ml-4 justify-center">
        <v-btn
          v-if="!editMode"
          small
          rounded
          outlined
          @click="editMode = !editMode"
        >
          <v-icon left>mdi-pencil</v-icon>Edit
        </v-btn>
        <v-btn
          v-else
          small
          rounded
          outlined
          @click="editMode = !editMode"
        >
          Done
        </v-btn>
      </div>
    </v-toolbar-items>
    <fragment v-if="editMode">
      <SocialMediaInput class="mt-2" v-model="internalValue" />
    </fragment>
    <fragment v-else-if="Object.keys(value).length">
      <SocialMediaLink v-bind="internalValue" />
    </fragment>
  </fragment>
</template>
