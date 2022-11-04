<template>
  <fragment>
    <div
      v-for="(link, i) in internal"
      :key="JSON.stringify(link)"
    >  
      <SocialMediaInput
        v-model="internal[i]"
        @click:delete="deleteLink(i)"
      />
    </div>
    <v-btn
      color="primary"
      block
      @click="newLink"
    >
      <v-icon left>mdi-plus</v-icon>
      Add link
    </v-btn>
  </fragment>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import SocialMediaInput from './SocialMediaInput.vue'

export default defineComponent({
  name: "SocialMediaEdit",
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const internal = ref(props.value)
    
    const emitValue = () => {
      emit('input', internal.value)
    }

    watchEffect(() => {
      // emitValue()
      emit('input', internal.value)
    })

    const newLink = () => {
      internal.value = [...internal.value, {
        name: '',
        username: '',
        url: ''
      }]
    }

    const removeLink = (i) => {
      internal.value.splice(i, 1)
    }

    return {
      internal,
      emitValue,
      newLink,
      removeLink
    }
  },
  components: {
    SocialMediaInput
  }
})
</script>

