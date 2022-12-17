<template>
  <v-menu
    bottom
    nudge-bottom
    offset-y
    :value="isResultDisplayed"
    :open-on-click="false"
    :close-on-click="false"
    :close-on-content-click="false"
    max-height="20vh"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="value"
        label="Search"
        @focus="isSearchBoxFocused = true"
        @input="handleInput"
        @click:clear="clearSearch"
        clearable
        dense
        outlined
        :hide-details="true"
        v-on="on"
      >
        <template #append>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </template>
    <ResultList />
  </v-menu>
</template>

<script>
import { useSearchResultStore } from '@/store/searchResult';
import { useMapStateStore } from '@/store/mapState'
import { debounce } from 'lodash'
import { mapActions, mapState } from 'pinia'
import ResultList from './ResultsList.vue'

export default {
  name: 'SearchBox',
  computed: {
    ...mapState(useMapStateStore, ['bounds']),
    ...mapState(useSearchResultStore, ['searchResults']),
    isResultDisplayed () {
      return this.searchResults.length > 0 && this.value.length > 0
    }
  },
  data () {
    return {
      value: '',
      isSearchBoxFocused: false
    }
  },
  methods: {
    ...mapActions(useSearchResultStore, ['fetchSearchResults', 'reset']),
    handleInput: debounce(function (e) { this.fetchSearchResults(this.bounds, e) }, 500),
    clearSearch () {
      this.reset()
    }
  },
  components: {
    ResultList
  }
}
</script>
