<template>
  <div class="d-flex">
    <div class="flex-shrink-1">
      <v-select
        outlined
        label="Social media"
        :items="items"
        v-model="name"
        item-text="title"
        item-value="title"
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
      <v-text-field outlined label="Username" placeholder="@john.smith" v-model="username" />
    </div>
    <div class="flex-grow-1">
      <v-text-field
        outlined
        label="Address"
        v-model="url"
        :placeholder="
          value.name?.length ?
          `https://www.${value.name.toLowerCase()}.com/john.smith` :
          'https://www.example.com/john.smith'
        "
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({
        name: '',
        username: '',
        url: ''
      })
    }
  },
  setup(props, { emit }) {
    const items = ref([
      {
        icon: 'mdi-instagram',
        title: 'Instagram'
      }
    ])

    const name = ref(props.value.name) ?? ''
    const url = ref(props.value.url) ?? ''
    const username = ref(props.value.username) ?? ''

    watchEffect(() => {
      let urlPath = ''
      switch (name.value.toLowerCase()) {
        case 'instagram':
          urlPath = username.value?.charAt(0) === '@' ? username.value.substring(1) : username.value
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
    })

    return { items, name, url, username }
  },
})
</script>

