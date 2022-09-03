<template>
  <v-tooltip top>
    <fragment v-if="chipColor !== 'danger'">
      <div
        v-for="day in openingHours.weekday_text"
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
    'business-status': {
      type: String,
      default: () => 'OPERATIONAL'
    }
  },
  computed: {
    chipColor () {
      if (this.isOpen) return 'success'
      switch (this.business_status) {
        case 'TEMPORARILY_CLOSED':
          return 'warning';
        case 'PERMANENTLY_CLOSED':
          return 'danger';
        default:
          return undefined;
      }
    },
    chipLabel () {
      if (this.chipColor === 'danger') return 'Permanently closed'
      if (this.isOpen) return 'Currently open'
      return 'Currently closed'
    },
    isOpen () {
      return this.openingHours.isOpen()
    }
  }
}
</script>
