<template>
  <div class="d-flex align-center justify-space-between">
    <div class="flex-shrink-1">
      <v-select
        outlined
        label="Social media"
        :items="items"
        v-model="name"
        item-text="title"
        item-value="title"
        @change="handleInput"
      >
        <template #item="{ item, on, attrs }">
          <v-list-item v-on="on" v-bind="attrs">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template #selection="{ item }">
          <v-icon left>{{ item.icon }}</v-icon>
          <span>{{ value.name }}</span>
        </template>
      </v-select>
    </div>
    <div class="mx-2">
      <v-text-field
        outlined
        label="Username"
        placeholder="@john.smith"
        v-model="username"
        @input="handleInput"
      />
    </div>
    <div class="flex-grow-1">
      <v-text-field
        outlined
        label="Address"
        :placeholder="
          value.name?.length ?
          `https://www.${value.name.toLowerCase()}.com/john.smith` :
          'https://www.example.com/john.smith'
        "
        v-model="url"
        @input="handleInput"
      />
    </div>
    <div>
      <v-btn icon @click="emitDelete">
        <v-icon>mdi-trash</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const items = ref([
      {
        icon: 'mdi-web',
        title: 'Website'
      },
      {
        icon: 'mdi-instagram',
        title: 'Instagram'
      }
    ])

    const name = ref(props.value?.name ?? '')
    const url = ref(props.value?.url ?? '')
    const username = ref(props.value?.username ?? '')

    // watchEffect(() => {
    //   let urlPath = ''
    //   switch (name.value.toLowerCase()) {
    //     case 'instagram':
    //       urlPath = (
    //         username.value?.charAt(0) === '@' ?
    //         username.value.substring(1) :
    //         username.value
    //       )
    //       url.value = `https://${name.value.toLowerCase()}.com/${urlPath ?? ''}`
    //       break;
      
    //     default:
    //       break;
    //   }
    //   emit('input', {
    //     name: name.value,
    //     username: username.value,
    //     url: url.value
    //   })
    // })

    const handleInput = () => {
      let urlPath = ''
      switch (name.value.toLowerCase()) {
        case 'instagram':
          urlPath = (
            username.value?.charAt(0) === '@' ?
            username.value.substring(1) :
            username.value
          )
          url.value = `https://${name.value.toLowerCase()}.com/${urlPath ?? ''}`
          break;
      
        default:
          break;
      }
      emit('input', {
        name: name.value,
        username: username.value,
        url: url.value
      })
    }

    const emitDelete = () => {
      emit('click:delete')
    }

    return { items, name, url, username, handleInput, emitDelete }
  },
})
</script>

