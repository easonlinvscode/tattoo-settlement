<template>
  <div class="p-8 max-w-2xl">
    <div class="mb-10">
      <p class="text-xs text-ink-400 tracking-[0.3em] uppercase mb-2">Profile</p>
      <h1 class="font-display text-2xl text-parchment-100 tracking-wide">個人資料</h1>
    </div>

    <!-- Success message -->
    <Transition name="fade">
      <div v-if="saved" class="mb-6 p-4 border border-moss-600 bg-moss-700/20 text-moss-300 text-sm tracking-wide">
        ✓ 資料已儲存
      </div>
    </Transition>

    <form @submit.prevent="handleSave" class="space-y-7">
      <!-- Avatar preview -->
      <div class="flex items-center gap-6">
        <img
          :src="form.avatar || auth.user?.avatar"
          alt="Avatar"
          class="w-20 h-20 rounded-full object-cover border-2 border-ink-600"
        />
        <div>
          <button type="button" class="btn-outline text-xs py-2">更換頭像</button>
          <p class="text-xs text-ink-500 mt-2">JPG、PNG，最大 2MB</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="label-dark">藝名 / 姓名</label>
          <input v-model="form.name" type="text" class="input-dark" required />
        </div>
        <div>
          <label class="label-dark">工作室名稱</label>
          <input v-model="form.studioName" type="text" class="input-dark" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="label-dark">城市</label>
          <select v-model="form.city" class="input-dark">
            <option v-for="city in CITY_OPTIONS" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div>
          <label class="label-dark">接受預約</label>
          <div class="flex items-center gap-3 mt-3">
            <button
              type="button"
              class="w-10 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0"
              :class="form.isAvailable ? 'bg-moss-600' : 'bg-ink-600'"
              @click="form.isAvailable = !form.isAvailable"
            >
              <div
                class="w-4 h-4 bg-parchment-100 rounded-full absolute top-1 transition-transform"
                :class="form.isAvailable ? 'translate-x-5' : 'translate-x-1'"
              ></div>
            </button>
            <span class="text-sm text-ink-300">{{ form.isAvailable ? '目前接受預約' : '暫停預約' }}</span>
          </div>
        </div>
      </div>

      <div>
        <label class="label-dark">擅長風格（最多選 5 項）</label>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="style in STYLE_OPTIONS"
            :key="style"
            type="button"
            class="tag-style text-xs transition-all"
            :class="form.styles.includes(style)
              ? 'bg-parchment-100 text-ink-900 border-parchment-100'
              : 'text-ink-400 border-ink-600 hover:border-ink-400'"
            @click="toggleStyle(style)"
          >
            {{ style }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div>
          <label class="label-dark">起始收費（NT$）</label>
          <input v-model.number="form.priceMin" type="number" class="input-dark" />
        </div>
        <div>
          <label class="label-dark">最高收費（NT$）</label>
          <input v-model.number="form.priceMax" type="number" class="input-dark" />
        </div>
      </div>

      <div>
        <label class="label-dark">個人簡介</label>
        <textarea v-model="form.intro" rows="5" class="input-dark resize-none" placeholder="介紹你的創作理念、風格特色..."></textarea>
      </div>

      <div>
        <label class="label-dark">Instagram 連結</label>
        <input v-model="form.instagram" type="url" class="input-dark" placeholder="https://instagram.com/yourhandle" />
      </div>

      <div class="pt-4">
        <button type="submit" class="btn-primary">儲存資料</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mockArtists, STYLE_OPTIONS, CITY_OPTIONS } from '@/data/artists'

const auth = useAuthStore()
const saved = ref(false)

const artist = mockArtists.find((a) => a.id === auth.user?.artistId) || mockArtists[0]

const form = ref({
  name: artist.name,
  studioName: artist.studioName,
  city: artist.city,
  isAvailable: artist.isAvailable,
  styles: [...artist.styles],
  priceMin: artist.priceRange.min,
  priceMax: artist.priceRange.max,
  intro: artist.intro,
  instagram: artist.socialLinks.instagram || '',
  avatar: artist.avatar,
})

function toggleStyle(style) {
  const idx = form.value.styles.indexOf(style)
  if (idx === -1) {
    if (form.value.styles.length < 5) form.value.styles.push(style)
  } else {
    form.value.styles.splice(idx, 1)
  }
}

function handleSave() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
