<template>
  <div class="min-h-screen bg-ink-900 flex">
    <!-- Sidebar -->
    <aside class="w-64 flex-shrink-0 border-r border-ink-700 flex flex-col">
      <!-- Logo -->
      <div class="px-6 py-6 border-b border-ink-700">
        <RouterLink to="/" class="font-brand text-lg text-parchment-100 tracking-wider">
          塔圖聚落
        </RouterLink>
        <p class="text-xs text-ink-300 mt-1 tracking-widest uppercase">Designer Portal</p>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 text-sm text-ink-200 tracking-wide transition-all duration-200 hover:text-parchment-100 hover:bg-ink-700 group"
          active-class="bg-ink-700 text-parchment-100"
        >
          <span class="text-lg">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User -->
      <div class="px-4 py-4 border-t border-ink-700">
        <div class="flex items-center gap-3">
          <img
            :src="auth.user?.avatar"
            :alt="auth.user?.name"
            class="w-9 h-9 rounded-full object-cover border border-ink-600"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm text-parchment-100 truncate">{{ auth.user?.name }}</p>
            <p class="text-xs text-ink-300 truncate">設計師</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="mt-3 w-full text-left text-xs text-ink-400 hover:text-wine-400 transition-colors tracking-widest uppercase"
        >
          登出
        </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const navItems = [
  { name: 'dashboard', label: '總覽', path: '/designer/dashboard', icon: '◈' },
  { name: 'portfolio', label: '作品集', path: '/designer/portfolio', icon: '◉' },
  { name: 'requests', label: '預約需求', path: '/designer/requests', icon: '◎' },
  { name: 'profile', label: '個人資料', path: '/designer/profile', icon: '◇' },
]

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
