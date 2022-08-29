<template>
  <v-tooltip top>
    <fragment v-if="!['permanently-closed']">
      <div
        v-for="day in ['opening-hours'].weekday_text"
        :key="day"
      >
        {{day}}
      </div>
    </fragment>
    <div v-else>This place is permanently closed</div>
    <template #activator="{ on, attrs }">
      <v-chip :color="chipColor" v-bind="attrs" v-on="on">
        {{isOpen ? 'Currently open' : 'Currently closed'}}
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: 'OpeningHours',
  props: {
    'opening-hours': {
      type: Object,
      required: true
    },
    'permanently-closed': {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    chipColor () {
      if (this['permanently-closed']) return 'red'
      if (this.isOpen) return 'green'
      return false
    },
    chipLabel () {
      if (this['permanently-closed']) return 'Permanently closed'
      if (this.isOpen) return 'Currently open'
      return 'Currently closed'
    },
    isOpen () {
      return this['opening-hours']?.isOpen()
    }
  }
}
</script>
