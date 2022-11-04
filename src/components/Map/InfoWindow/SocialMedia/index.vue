<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { Fragment as fragment } from 'vue-fragment'
import SocialMediaInput from './SocialMediaEdit'
import SocialMediaLink from './SocialMediaLink.vue'

export default defineComponent({
  name: "SocialMedia",
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const internalValue = ref(props.value ?? []);
    const editMode = ref(false);

    watchEffect(() => {
      emit('input', [...internalValue.value])
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
    <div class="d-flex mb-2">
      <h3 class="text-h7 justify-center align-center">Links &amp; Social Media</h3>
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
    </div>
    <fragment v-if="editMode">
      <SocialMediaInput class="mt-2" v-model="internalValue" />
    </fragment>
    <fragment v-else-if="internalValue.length">
      <div v-for="(link, i) in internalValue" :key="i">
        <SocialMediaLink v-bind="link" />
      </div>
    </fragment>
    <fragment v-else>
      <div class="my-3 text--disabled text-center">No social media link</div>
    </fragment>
  </fragment>
</template>
