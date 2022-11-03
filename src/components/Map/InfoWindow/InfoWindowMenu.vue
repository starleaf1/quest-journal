<template>
  <fragment>
    <fragment
      v-for="(item, i) in itemsOutside"
      :key="i"
    >
      <v-btn
        v-if="isOnPC"
        text
        :href="item.href"
        :to="item.to"
        @click="item.onClick"
      >
        <v-icon
          v-if="['text-and-icon']"
          left
        >
          {{ item.icon }}
        </v-icon>
        {{ item.label }}
      </v-btn>
      <v-btn
        v-else
        icon
        :href="item.href"
        :to="item.to"
        @click="item.onClick"
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </fragment>
    <v-menu offset-y>
      <template #activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in itemsInMenu"
          :key="i"
          :href="item.href"
          :to="item.to"
          @click="item.onClick"
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </fragment>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true
    },
    ['text-and-icon']: {
      type: Boolean,
      default: () => false
    },
    ['show-outside']: {
      type: Number,
      default: () => 0
    }
  },
  setup(props) {
    console.log('[info-window-menu] Menu items', props.showOutside)
    const itemsInMenu = computed(() => {
      const filtered = props.items.filter((item, index) => index + 1 > props.showOutside)
      return filtered
    })
    const itemsOutside = computed(() => {
      const filtered = props.items.filter((item, index) => index + 1 <= props.showOutside)
      return filtered
    })

    return { itemsInMenu, itemsOutside }
  },
})
</script>

