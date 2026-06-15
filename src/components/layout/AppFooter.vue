<template>
  <footer class="bg-ink-950 border-t border-ink-800 mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="font-brand text-parchment-100 text-xl tracking-widest mb-2">塔圖聚落</div>
          <div class="font-display text-ink-400 text-xs tracking-[0.3em] uppercase mb-4">Tattoo Settlement</div>
          <p class="text-ink-300 text-sm leading-relaxed max-w-xs">
            刺青作品展示與風格媒合平台。<br />連結每一位追求藝術的靈魂。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-display text-xs text-ink-400 tracking-[0.25em] uppercase mb-4">探索</h3>
          <ul class="space-y-3">
            <li v-for="link in exploreLinks" :key="link.label">
              <RouterLink :to="link.path" class="text-sm text-ink-300 hover:text-parchment-100 transition-colors">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Designer -->
        <div>
          <h3 class="font-display text-xs text-ink-400 tracking-[0.25em] uppercase mb-4">設計師</h3>
          <ul class="space-y-3">
            <li v-for="link in designerLinks" :key="link.label">
              <RouterLink :to="link.path" class="text-sm text-ink-300 hover:text-parchment-100 transition-colors">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-16 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-ink-500 text-xs tracking-wider">
          © 2026 塔圖聚落 Tattoo Settlement. All rights reserved.
        </p>
        <p class="text-ink-600 text-xs">
          皮膚是最真實的畫布
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const exploreLinks = [
  { label: '探索作品', path: '/explore' },
  { label: '刺青師列表', path: '/artists' },
]

const designerLinks = [
  { label: '設計師登入', path: '/auth/login' },
  { label: '加入我們', path: '/auth/register' },
]
</script>
