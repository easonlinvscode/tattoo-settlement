<template>
  <div class="animate-slide-up">
    <h2 class="font-display text-2xl text-parchment-100 tracking-wide mb-2">歡迎回來</h2>
    <p class="text-ink-400 text-sm mb-10">登入你的塔圖聚落帳號</p>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label class="label-dark">電子郵件</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          class="input-dark"
          required
        />
      </div>
      <div>
        <label class="label-dark">密碼</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          class="input-dark"
          required
        />
      </div>

      <button type="submit" class="btn-primary w-full mt-6">
        登入
      </button>
    </form>

    <!-- Demo buttons -->
    <div class="mt-8 pt-8 border-t border-ink-800">
      <p class="text-xs text-ink-500 tracking-wider text-center mb-4">Demo 快速登入</p>
      <div class="flex gap-3">
        <button
          @click="demoLoginCustomer"
          class="flex-1 btn-outline text-xs py-2"
        >
          顧客登入
        </button>
        <button
          @click="demoLoginDesigner"
          class="flex-1 btn-outline text-xs py-2"
        >
          設計師登入
        </button>
      </div>
    </div>

    <p class="mt-8 text-center text-sm text-ink-400">
      還沒帳號？
      <RouterLink to="/auth/register" class="text-parchment-200 hover:text-parchment-50 transition-colors">
        立即加入
      </RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })

function handleLogin() {
  // Mock login — in production this would call API
  auth.mockLoginAsCustomer()
  const redirect = route.query.redirect || '/'
  router.push(redirect)
}

function demoLoginCustomer() {
  auth.mockLoginAsCustomer()
  router.push('/')
}

function demoLoginDesigner() {
  auth.mockLoginAsDesigner()
  router.push('/designer/dashboard')
}
</script>
