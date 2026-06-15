<template>
  <div class="animate-slide-up">
    <h2 class="font-display text-2xl text-parchment-100 tracking-wide mb-2">加入聚落</h2>
    <p class="text-ink-400 text-sm mb-10">建立你的塔圖聚落帳號</p>

    <!-- Role selector -->
    <div class="grid grid-cols-2 gap-3 mb-8">
      <button
        v-for="role in roles"
        :key="role.value"
        class="p-4 border text-left transition-all duration-200"
        :class="selectedRole === role.value
          ? 'border-parchment-200 bg-ink-700'
          : 'border-ink-700 hover:border-ink-500'"
        @click="selectedRole = role.value"
      >
        <span class="block text-lg mb-2">{{ role.icon }}</span>
        <p class="font-display text-sm text-parchment-100 tracking-wide">{{ role.label }}</p>
        <p class="text-xs text-ink-400 mt-1">{{ role.desc }}</p>
      </button>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="label-dark">姓名 / 藝名</label>
        <input v-model="form.name" type="text" placeholder="你的名字" class="input-dark" required />
      </div>
      <div>
        <label class="label-dark">電子郵件</label>
        <input v-model="form.email" type="email" placeholder="your@email.com" class="input-dark" required />
      </div>
      <div>
        <label class="label-dark">密碼</label>
        <input v-model="form.password" type="password" placeholder="至少 8 個字元" class="input-dark" required />
      </div>

      <template v-if="selectedRole === 'designer'">
        <div>
          <label class="label-dark">工作室名稱</label>
          <input v-model="form.studioName" type="text" placeholder="你的工作室名稱" class="input-dark" />
        </div>
        <div>
          <label class="label-dark">所在城市</label>
          <select v-model="form.city" class="input-dark">
            <option value="">選擇城市</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
      </template>

      <button type="submit" class="btn-primary w-full mt-6">
        建立帳號
      </button>
    </form>

    <p class="mt-8 text-center text-sm text-ink-400">
      已有帳號？
      <RouterLink to="/auth/login" class="text-parchment-200 hover:text-parchment-50 transition-colors">
        返回登入
      </RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { CITY_OPTIONS } from '@/data/artists'

const auth = useAuthStore()
const router = useRouter()

const selectedRole = ref('customer')
const cities = CITY_OPTIONS

const roles = [
  { value: 'customer', label: '我是顧客', icon: '◎', desc: '探索刺青作品，找到心儀的刺青師' },
  { value: 'designer', label: '我是刺青師', icon: '◈', desc: '展示作品集，接受顧客預約' },
]

const form = ref({
  name: '',
  email: '',
  password: '',
  studioName: '',
  city: '',
})

function handleRegister() {
  if (selectedRole.value === 'designer') {
    auth.mockLoginAsDesigner()
    router.push('/designer/dashboard')
  } else {
    auth.mockLoginAsCustomer()
    router.push('/')
  }
}
</script>
