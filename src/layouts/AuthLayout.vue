<template>
  <div class="min-h-screen bg-ink-900 flex">
    <!-- Left: Visual Panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1753260937548-94b93659d889?auto=format&fit=crop&w=900&h=1200&q=80"
        alt="Tattoo art"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent"></div>
      <div class="relative z-10 flex flex-col justify-end p-16">
        <RouterLink to="/" class="font-brand text-2xl text-parchment-100 tracking-widest mb-6">
          塔圖聚落
        </RouterLink>
        <p class="font-display text-4xl text-parchment-100 leading-snug tracking-wide">
          找到屬於你的<br />刺青藝術家
        </p>
        <p class="mt-4 text-ink-200 font-light max-w-xs">
          加入塔圖聚落，探索百位頂尖刺青師作品，預約屬於你的第一針。
        </p>
      </div>
    </div>

    <!-- Right: Form Panel -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <!-- Mobile logo -->
      <RouterLink to="/" class="lg:hidden font-brand text-xl text-parchment-100 tracking-widest mb-12">
        塔圖聚落
      </RouterLink>

      <div class="w-full max-w-md">
        <RouterView />
      </div>

      <p class="mt-10 text-ink-300 text-xs">
        © 2024 塔圖聚落 Tattoo Settlement
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
