<template>
  <v-card>
    <v-card-title>{{place.name}}</v-card-title>
    <v-card-text>
      <p>{{place.notes}}</p>
      <v-chip-group>
        <v-chip
          outlined
          v-for="tag in place.tags"
          :key="tag"
        />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SavedInfoDialog',
  props: {
    place: {
      required: true,
      type: Object
    }
  }
}
</script>
