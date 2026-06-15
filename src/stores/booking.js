import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockBookings } from '@/data/bookings'

export const useBookingStore = defineStore('booking', () => {
  const requests = ref([...mockBookings])

  function submitRequest(data) {
    const newRequest = {
      id: `br-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    requests.value.unshift(newRequest)
    return newRequest
  }

  function updateStatus(id, status) {
    const req = requests.value.find((r) => r.id === id)
    if (req) req.status = status
  }

  function getByArtist(artistId) {
    return requests.value.filter((r) => r.artistId === artistId)
  }

  function getByCustomer(customerId) {
    return requests.value.filter((r) => r.customerId === customerId)
  }

  return {
    requests,
    submitRequest,
    updateStatus,
    getByArtist,
    getByCustomer,
  }
})
