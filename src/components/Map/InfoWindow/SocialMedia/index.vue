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
    
    const toggleEditMode = () => {
      editMode.value = !editMode.value

      if (!editMode.value) {
        internalValue.value = internalValue.value.filter(link => {
          return link?.url?.length > 0
        })
      }
    }

    return { internalValue, editMode, toggleEditMode }
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
    <div class="d-flex mb-4">
      <h3 class="text-h7 justify-center align-center">Links &amp; Social Media</h3>
      <div class="ml-4 justify-center">
        <v-btn
          v-if="!editMode"
          small
          rounded
          outlined
          @click="toggleEditMode"
        >
          <v-icon left>mdi-pencil</v-icon>Edit
        </v-btn>
        <v-btn
          v-else
          small
          rounded
          outlined
          @click="toggleEditMode"
        >
          Done
        </v-btn>
      </div>
    </div>
    <fragment v-if="editMode">
      <SocialMediaInput class="mt-2" v-model="internalValue" />
    </fragment>
    <fragment v-else-if="internalValue.length">
      <SocialMediaLink v-for="(link, i) in internalValue" :key="i" v-bind="link" />
    </fragment>
    <fragment v-else>
      <div class="my-3 text--disabled text-center">No social media link</div>
    </fragment>
  </fragment>
</template>
