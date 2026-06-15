<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <p class="font-display text-8xl text-ink-700 mb-8">404</p>
    <h1 class="font-display text-2xl text-parchment-100 tracking-wide mb-4">找不到頁面</h1>
    <p class="text-ink-400 text-sm max-w-xs">
      你所尋找的頁面不存在或已移動。
    </p>
    <RouterLink to="/" class="mt-10 btn-outline text-xs">返回首頁</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
