<template>
  <fragment>
    <div
      v-for="(link, i) in internal"
      :key="`${JSON.stringify}${i}`"
    >  
      <SocialMediaInput
        @click:delete="deleteLink(i)"
        v-model="internal[i]"
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
  setup(
    props, { emit }
  ) {
    const internal = ref(props.value)
    
    watchEffect(() => {
      emit('input', internal.value)
    })

    const newLink = () => {
      const newElement = {
        url: '',
        username: '',
        name: ''
      }
      internal.value = [...internal.value, newElement]
    }

    const deleteLink = (i) => {
      internal.value.splice(i, 1)
    }

    return {
      internal,
      // emitValue,
      newLink,
      deleteLink
    }
  },
  components: {
    SocialMediaInput
  }
})
</script>

