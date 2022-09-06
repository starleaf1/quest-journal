import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  console.debug('[store] Auth store installed')
  const persisted = JSON.parse(localStorage.getItem('auth'))

  const isAuthenticated = ref(persisted?.isAuthenticated ?? false)
  const isFetchingAuth = ref(true)
  const user = ref(persisted?.user ?? null)
  const uid = computed(() => user.value?.uid)

  function storeAuthData(userData) {
    user.value = userData
    isAuthenticated.value = true
    isFetchingAuth.value = false
  }

  function clearAuthData() {
    user.value = null
    isAuthenticated.value = false
    isFetchingAuth.value = false
  }

  watch([ isAuthenticated, isFetchingAuth, user ], ([ isAuthenticated, isFetchingAuth, user ]) => {
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated, isFetchingAuth, user }))
  })

  useAuthStore().$onAction((ctx) => {
    console.debug('[auth-store] Action subscription initiated', ctx)
  })

  return { isAuthenticated, isFetchingAuth, user, uid, storeAuthData, clearAuthData }
});
