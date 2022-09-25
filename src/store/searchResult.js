import { searchByText } from "@/api/placesQueries";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchResultStore = defineStore('searchResultStore', () => {
  const searchResults = ref([])
  const currentKeyword = ref('')

  const fetchSearchResults = async (bounds, keywords) => {
    // if (!keywords?.length) return
    console.log('[place-search] Searching for keywords', bounds, keywords)
    currentKeyword.value = keywords
    searchResults.value = await searchByText(bounds, keywords)
  }

  const repeatSearchWithBounds = async bounds => {
    console.log('[place-search] Repeating search with new bounds', bounds)
    fetchSearchResults(bounds, currentKeyword.value)
  }

  const reset = function () {
    currentKeyword.value = ''
    searchResults.value = []
  }

  return { searchResults, fetchSearchResults, repeatSearchWithBounds, reset, currentKeyword }
})