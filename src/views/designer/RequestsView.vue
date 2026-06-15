<template>
  <div class="p-8">
    <div class="mb-10">
      <p class="text-xs text-ink-400 tracking-[0.3em] uppercase mb-2">Requests</p>
      <h1 class="font-display text-2xl text-parchment-100 tracking-wide">預約需求</h1>
      <p class="text-ink-300 text-sm mt-1">{{ requests.length }} 則需求</p>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-1 border-b border-ink-700 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="px-5 py-3 font-display text-xs tracking-widest uppercase border-b-2 transition-colors"
        :class="activeTab === tab.value
          ? 'border-parchment-100 text-parchment-100'
          : 'border-transparent text-ink-400 hover:text-ink-200'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span class="ml-1.5 text-[10px] text-ink-500">{{ countByStatus(tab.value) }}</span>
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="filteredRequests.length === 0" class="text-center py-20">
      <p class="text-ink-400 text-4xl mb-4">◌</p>
      <p class="text-ink-300">目前沒有此狀態的需求</p>
    </div>

    <!-- Requests list -->
    <div v-else class="space-y-4">
      <div
        v-for="req in filteredRequests"
        :key="req.id"
        class="card-dark p-6"
      >
        <div class="flex items-start justify-between gap-4">
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <h3 class="font-display text-sm text-parchment-100 tracking-wide">{{ req.customerName }}</h3>
              <span class="text-[10px] px-2 py-0.5 border" :class="BOOKING_STATUS[req.status].color">
                {{ BOOKING_STATUS[req.status].label }}
              </span>
            </div>

            <div class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <p class="text-ink-500 tracking-wider mb-1">聯絡方式</p>
                <p class="text-ink-200">{{ req.contact }}</p>
              </div>
              <div>
                <p class="text-ink-500 tracking-wider mb-1">風格</p>
                <p class="text-ink-200">{{ req.preferredStyle || '不限' }}</p>
              </div>
              <div>
                <p class="text-ink-500 tracking-wider mb-1">部位 / 尺寸</p>
                <p class="text-ink-200">{{ req.bodyPart || '未定' }} · {{ req.size }}</p>
              </div>
              <div>
                <p class="text-ink-500 tracking-wider mb-1">預算</p>
                <p class="text-ink-200">NT$ {{ req.budget?.toLocaleString() || '未填' }}</p>
              </div>
            </div>

            <div v-if="req.note" class="mt-4 p-3 bg-ink-700/50 border-l-2 border-ink-600">
              <p class="text-xs text-ink-300 leading-relaxed">{{ req.note }}</p>
            </div>

            <p class="text-[10px] text-ink-600 mt-3">
              送出時間：{{ formatDate(req.createdAt) }}
              <template v-if="req.preferredDate">
                · 希望日期：{{ req.preferredDate }}
              </template>
            </p>
          </div>

          <!-- Actions -->
          <div v-if="req.status === 'pending'" class="flex flex-col gap-2 flex-shrink-0">
            <button
              @click="updateStatus(req.id, 'confirmed')"
              class="text-xs px-4 py-2 border border-moss-600 text-moss-400 hover:bg-moss-700/30 transition-colors tracking-wider"
            >
              確認
            </button>
            <button
              @click="updateStatus(req.id, 'rejected')"
              class="text-xs px-4 py-2 border border-wine-700 text-wine-400 hover:bg-wine-700/30 transition-colors tracking-wider"
            >
              婉拒
            </button>
          </div>
          <div v-else-if="req.status === 'confirmed'" class="flex-shrink-0">
            <button
              @click="updateStatus(req.id, 'completed')"
              class="text-xs px-4 py-2 border border-ink-600 text-ink-300 hover:text-parchment-100 hover:border-parchment-300 transition-colors tracking-wider"
            >
              標記完成
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBookingStore } from '@/stores/booking'
import { BOOKING_STATUS } from '@/data/bookings'

const auth = useAuthStore()
const bookingStore = useBookingStore()
const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待處理' },
  { value: 'confirmed', label: '已確認' },
  { value: 'completed', label: '已完成' },
  { value: 'rejected', label: '已婉拒' },
]

const requests = computed(() =>
  bookingStore.getByArtist(auth.user?.artistId || 'a-001'),
)

const filteredRequests = computed(() => {
  if (activeTab.value === 'all') return requests.value
  return requests.value.filter((r) => r.status === activeTab.value)
})

function countByStatus(status) {
  if (status === 'all') return requests.value.length
  return requests.value.filter((r) => r.status === status).length
}

function updateStatus(id, status) {
  bookingStore.updateStatus(id, status)
}

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
</script>
