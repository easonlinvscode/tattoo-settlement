<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-10">
      <p class="text-xs text-ink-400 tracking-[0.3em] uppercase mb-2">Dashboard</p>
      <h1 class="font-display text-2xl text-parchment-100 tracking-wide">
        嗨，{{ auth.user?.name }} 👋
      </h1>
      <p class="text-ink-300 text-sm mt-1">你的塔圖聚落今日動態</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      <div v-for="stat in stats" :key="stat.label" class="card-dark p-5">
        <p class="text-xs text-ink-400 tracking-widest uppercase mb-3">{{ stat.label }}</p>
        <p class="font-display text-3xl text-parchment-100">{{ stat.value }}</p>
        <p class="text-xs text-ink-500 mt-2">{{ stat.sub }}</p>
      </div>
    </div>

    <!-- Content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent requests -->
      <div class="card-dark p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display text-sm text-parchment-100 tracking-wider">最新預約需求</h2>
          <RouterLink to="/designer/requests" class="text-xs text-ink-400 hover:text-parchment-100 transition-colors">
            查看全部 →
          </RouterLink>
        </div>

        <div v-if="recentRequests.length === 0" class="text-center py-8 text-ink-500 text-sm">
          尚無預約需求
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="req in recentRequests"
            :key="req.id"
            class="flex items-start gap-4 p-4 bg-ink-700/50 hover:bg-ink-700 transition-colors"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm text-parchment-100 font-medium">{{ req.customerName }}</p>
                <span class="text-[10px] px-2 py-0.5 border" :class="BOOKING_STATUS[req.status].color">
                  {{ BOOKING_STATUS[req.status].label }}
                </span>
              </div>
              <p class="text-xs text-ink-300 mt-1 truncate">{{ req.note || '無備注' }}</p>
              <p class="text-[10px] text-ink-500 mt-1">{{ req.preferredStyle }} · NT$ {{ req.budget?.toLocaleString() || '未填' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent artworks -->
      <div class="card-dark p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display text-sm text-parchment-100 tracking-wider">我的作品</h2>
          <RouterLink to="/designer/portfolio" class="text-xs text-ink-400 hover:text-parchment-100 transition-colors">
            管理作品 →
          </RouterLink>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="artwork in myArtworks.slice(0, 6)"
            :key="artwork.id"
            class="aspect-square overflow-hidden cursor-pointer"
          >
            <img
              :src="artwork.coverImage"
              :alt="artwork.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <p v-if="myArtworks.length === 0" class="text-center py-8 text-ink-500 text-sm">
          尚未上傳作品
        </p>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <RouterLink
        v-for="action in quickActions"
        :key="action.label"
        :to="action.path"
        class="card-dark p-4 text-center hover:bg-ink-700 transition-colors group"
      >
        <span class="text-2xl block mb-2">{{ action.icon }}</span>
        <p class="text-xs text-ink-300 group-hover:text-parchment-100 transition-colors tracking-wide">
          {{ action.label }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingStore } from '@/stores/booking'
import { mockArtworks } from '@/data/artworks'
import { BOOKING_STATUS } from '@/data/bookings'

const auth = useAuthStore()
const bookingStore = useBookingStore()

const myArtworks = computed(() =>
  mockArtworks.filter((aw) => aw.artistId === auth.user?.artistId),
)

const recentRequests = computed(() =>
  bookingStore.getByArtist(auth.user?.artistId || 'a-001').slice(0, 3),
)

const pendingCount = computed(() =>
  recentRequests.value.filter((r) => r.status === 'pending').length,
)

const stats = computed(() => [
  { label: '作品總數', value: myArtworks.value.length, sub: '件已上架' },
  { label: '預約需求', value: bookingStore.getByArtist(auth.user?.artistId || 'a-001').length, sub: '則需求' },
  { label: '待處理', value: pendingCount.value, sub: '則待回覆' },
  { label: '總收藏', value: '—', sub: '更新中' },
])

const quickActions = [
  { icon: '◉', label: '上傳作品', path: '/designer/portfolio' },
  { icon: '◎', label: '查看需求', path: '/designer/requests' },
  { icon: '◇', label: '編輯資料', path: '/designer/profile' },
  { icon: '◈', label: '我的主頁', path: `/artists/${auth.user?.artistId || 'a-001'}` },
]
</script>
