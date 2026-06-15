<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-ink-900/95 backdrop-blur-md border-b border-ink-700' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex flex-col leading-none">
          <span class="font-brand text-parchment-100 text-base md:text-lg tracking-widest">塔圖聚落</span>
          <span class="font-display text-ink-300 text-[9px] tracking-[0.3em] uppercase">Tattoo Settlement</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="font-display text-xs text-ink-200 tracking-[0.2em] uppercase hover:text-parchment-100 transition-colors"
            active-class="text-parchment-100"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Auth Actions -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Logged in as designer -->
          <template v-if="auth.isLoggedIn && auth.isDesigner">
            <RouterLink to="/designer/dashboard" class="btn-ghost text-xs">
              設計師後台
            </RouterLink>
            <button @click="auth.logout()" class="btn-ghost text-xs">登出</button>
          </template>

          <!-- Logged in as customer -->
          <template v-else-if="auth.isLoggedIn && auth.isCustomer">
            <RouterLink to="/favorites/artworks" class="btn-ghost text-xs">
              我的收藏
            </RouterLink>
            <div class="flex items-center gap-2">
              <img
                :src="auth.user?.avatar"
                :alt="auth.user?.name"
                class="w-8 h-8 rounded-full object-cover border border-ink-600"
              />
              <button @click="auth.logout()" class="btn-ghost text-xs">登出</button>
            </div>
          </template>

          <!-- Not logged in -->
          <template v-else>
            <RouterLink to="/auth/login" class="btn-ghost text-xs">登入</RouterLink>
            <RouterLink to="/auth/register" class="btn-outline text-xs py-2 px-4">加入我們</RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-ink-200 hover:text-parchment-100 transition-colors"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="block w-5 h-px bg-current mb-1.5 transition-all" :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
          <span class="block w-5 h-px bg-current mb-1.5 transition-all" :class="mobileOpen ? 'opacity-0' : ''"></span>
          <span class="block w-5 h-px bg-current transition-all" :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-ink-900/98 border-b border-ink-700 px-4 py-6"
      >
        <nav class="space-y-4 mb-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="block font-display text-sm text-ink-200 tracking-[0.2em] uppercase hover:text-parchment-100 transition-colors py-2"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <div class="flex gap-3 pt-4 border-t border-ink-700">
          <RouterLink to="/auth/login" class="btn-ghost text-xs" @click="mobileOpen = false">登入</RouterLink>
          <RouterLink to="/auth/register" class="btn-outline text-xs py-2 px-4" @click="mobileOpen = false">加入我們</RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const mobileOpen = ref(false)

const { y } = useScroll(window)
const scrolled = ref(false)

watch(y, (val) => {
  scrolled.value = val > 40
})

const navLinks = [
  { name: 'explore', label: '探索作品', path: '/explore' },
  { name: 'artists', label: '找刺青師', path: '/artists' },
]
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
