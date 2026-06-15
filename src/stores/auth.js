import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)
    const token = ref(null)

    const isLoggedIn = computed(() => !!user.value)
    const isDesigner = computed(() => user.value?.role === 'designer')
    const isCustomer = computed(() => user.value?.role === 'customer')

    function login(userData, authToken) {
      user.value = userData
      token.value = authToken
    }

    function logout() {
      user.value = null
      token.value = null
    }

    // Mock login for demo purposes
    function mockLoginAsCustomer() {
      user.value = {
        id: 'c-001',
        name: '陳小姐',
        email: 'demo@customer.com',
        role: 'customer',
        avatar: 'https://i.pravatar.cc/150?img=47',
      }
      token.value = 'mock-token-customer'
    }

    function mockLoginAsDesigner() {
      user.value = {
        id: 'a-001',
        name: 'YUKI 陳',
        email: 'yuki@tattoo.com',
        role: 'designer',
        artistId: 'a-001',
        avatar: 'https://i.pravatar.cc/150?img=36',
      }
      token.value = 'mock-token-designer'
    }

    return {
      user,
      token,
      isLoggedIn,
      isDesigner,
      isCustomer,
      login,
      logout,
      mockLoginAsCustomer,
      mockLoginAsDesigner,
    }
  },
  { persist: true },
)
