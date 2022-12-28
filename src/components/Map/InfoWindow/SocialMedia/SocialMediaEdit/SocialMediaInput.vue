<template>
  <v-sheet
    :outlined="!isOnPC"
    class="d-lg-flex align-center justify-space-between mb-lg-0 mb-2 pa-2"
  >
    <div
      class="flex-shrink-1 mb-n4 mb-lg-0"
    >
      <v-select
        outlined
        dense
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
    <div
      class="mx-0 mx-lg-2 mb-n4 mb-lg-0"
    >
      <v-text-field
        outlined
        dense
        :label="hasUsername ? 'Username' : 'Label'"
        placeholder="@john.smith"
        v-model="username"
        @input="handleInput"
        :disabled="isNameFieldDisabled"
      />
    </div>
    <div
      class="flex-grow-1 mb-n4 mb-lg-0"
    >
      <v-text-field
        outlined
        dense
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
    <v-btn class="align-self-start" v-if="isOnPC" icon @click="emitDelete">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-btn class="align-self-start" v-else block text @click="emitDelete">
      <v-icon left>mdi-delete</v-icon>
      Delete
    </v-btn>
  </v-sheet>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'

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
        title: 'Instagram',
        remarks: ["has_username"]
      },
      {
        icon: 'mdi-facebook',
        title: 'Facebook',
        remarks: ["has_username"]
      },
      {
        icon: 'mdi-twitter',
        title: 'Twitter',
        remarks: ["has_username"]
      },
      {
        icon: 'mdi-whatsapp',
        title: 'WhatsApp',
        remarks: ["has_username"]
      },
      {
        icon: 'mdi-youtube',
        title: 'YouTube',
        remarks: ["has_username"]
      },
      {
        title: "Agoda",
        remarks: ["no_name"]
      },
      {
        title: "Booking.com",
        remarks: ["no_name"]
      },
      {
        title: "Tiket.com",
        remarks: ["no_name"]
      },
      {
        title: "TripAdvisor",
        remarks: ["no_name"]
      },
      {
        title: "Traveloka",
        remarks: ["no_name"]
      }
    ])

    const name = ref(props.value?.name ?? '')
    const url = ref(props.value?.url ?? '')
    const username = ref(props.value?.username ?? '')

    const hasUsername = computed(() => items.value.find(item => (item.remarks ?? []).includes("has_username")))

    const isNameFieldDisabled = computed(() => items.value.find(item => (item.remarks ?? []).includes("no_name")))

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

    return {
      items,
      name,
      url,
      username,
      handleInput,
      emitDelete,
      hasUsername,
      isNameFieldDisabled
    }
  },
})
</script>

