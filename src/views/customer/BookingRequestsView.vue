<template>
  <div class="pt-20">
    <!-- Header -->
    <div class="py-14 border-b border-ink-800">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">Booking</p>
        <h1 class="section-title">預約需求</h1>
        <p class="text-ink-300 mt-3 text-sm" v-if="targetArtist">
          向 <span class="text-parchment-200">{{ targetArtist.name }}</span> 送出預約需求
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Target artist info -->
      <div v-if="targetArtist" class="card-dark p-5 mb-10 flex items-center gap-4">
        <img :src="targetArtist.avatar" :alt="targetArtist.name" class="w-14 h-14 rounded-full object-cover" />
        <div>
          <p class="font-display text-sm text-parchment-100">{{ targetArtist.name }}</p>
          <p class="text-xs text-ink-300 mt-0.5">{{ targetArtist.studioName }} · {{ targetArtist.city }}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="s in targetArtist.styles.slice(0, 2)" :key="s" class="tag-style text-[9px] text-ink-400 border-ink-700">{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- Submitted state -->
      <div v-if="submitted" class="text-center py-20">
        <div class="w-16 h-16 border border-moss-500 flex items-center justify-center mx-auto mb-6">
          <span class="text-moss-400 text-2xl">✓</span>
        </div>
        <h2 class="font-display text-xl text-parchment-100 mb-3">預約需求已送出</h2>
        <p class="text-ink-300 text-sm max-w-xs mx-auto">
          設計師將會在 2-3 個工作日內回覆你的需求。請保持聯絡方式暢通。
        </p>
        <RouterLink to="/explore" class="mt-8 inline-block btn-outline text-xs">繼續探索</RouterLink>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="label-dark">你的姓名</label>
            <input v-model="form.customerName" type="text" placeholder="姓名" class="input-dark" required />
          </div>
          <div>
            <label class="label-dark">聯絡方式（Email / IG / Line）</label>
            <input v-model="form.contact" type="text" placeholder="聯絡方式" class="input-dark" required />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="label-dark">期望風格</label>
            <select v-model="form.preferredStyle" class="input-dark">
              <option value="">不限</option>
              <option v-for="style in STYLE_OPTIONS" :key="style" :value="style">{{ style }}</option>
            </select>
          </div>
          <div>
            <label class="label-dark">預期部位</label>
            <select v-model="form.bodyPart" class="input-dark">
              <option value="">未定</option>
              <option v-for="opt in BODY_PART_OPTIONS.filter(o => o.value)" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="label-dark">尺寸</label>
            <select v-model="form.size" class="input-dark">
              <option v-for="opt in SIZE_TYPE_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div>
            <label class="label-dark">預算範圍（NT$）</label>
            <input v-model.number="form.budget" type="number" placeholder="例如：10000" class="input-dark" />
          </div>
        </div>

        <div>
          <label class="label-dark">期望預約日期</label>
          <input v-model="form.preferredDate" type="date" class="input-dark" />
        </div>

        <div>
          <label class="label-dark">備注 / 想法</label>
          <textarea
            v-model="form.note"
            rows="5"
            placeholder="請描述你的刺青想法、參考圖風格、特殊需求等..."
            class="input-dark resize-none"
          ></textarea>
        </div>

        <button type="submit" class="btn-wine w-full">送出預約需求</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import { useAuthStore } from '@/stores/auth'
import { mockArtists, STYLE_OPTIONS, CITY_OPTIONS } from '@/data/artists'
import { BODY_PART_OPTIONS, SIZE_TYPE_OPTIONS } from '@/data/artworks'

const route = useRoute()
const booking = useBookingStore()
const auth = useAuthStore()
const submitted = ref(false)

const targetArtist = computed(() => {
  const id = route.query.artistId
  return id ? mockArtists.find((a) => a.id === id) : null
})

const form = ref({
  customerName: auth.user?.name || '',
  contact: '',
  artistId: route.query.artistId || '',
  preferredStyle: '',
  bodyPart: '',
  size: 'medium',
  budget: null,
  preferredDate: '',
  note: '',
})

function handleSubmit() {
  booking.submitRequest({
    ...form.value,
    customerId: auth.user?.id || 'guest',
  })
  submitted.value = true
}
</script>
