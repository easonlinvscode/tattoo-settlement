<template>
  <div class="pt-20">
    <!-- Header -->
    <div class="py-14 border-b border-ink-800 bg-ink-950/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">Artists</p>
        <h1 class="section-title">刺青師列表</h1>
        <p class="text-ink-300 mt-3 text-sm">{{ filteredArtists.length }} 位刺青師</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="border-b border-ink-800 bg-ink-900/80 sticky top-16 z-40 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Search -->
          <div class="relative flex-1 min-w-48 max-w-64">
            <input
              v-model="search"
              type="text"
              placeholder="搜尋刺青師名稱..."
              class="input-dark text-sm pr-8"
            />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 text-xs">⌕</span>
          </div>

          <!-- City -->
          <select v-model="selectedCity" class="input-dark text-xs py-2.5 px-3 w-auto">
            <option value="">全部城市</option>
            <option v-for="city in CITY_OPTIONS" :key="city" :value="city">{{ city }}</option>
          </select>

          <!-- Style -->
          <select v-model="selectedStyle" class="input-dark text-xs py-2.5 px-3 w-auto">
            <option value="">全部風格</option>
            <option v-for="style in STYLE_OPTIONS" :key="style" :value="style">{{ style }}</option>
          </select>

          <!-- Available only -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="availableOnly" type="checkbox" class="sr-only" />
            <div
              class="w-9 h-5 rounded-full transition-colors duration-200 relative"
              :class="availableOnly ? 'bg-wine-600' : 'bg-ink-600'"
            >
              <div
                class="w-4 h-4 bg-parchment-100 rounded-full absolute top-0.5 transition-transform duration-200"
                :class="availableOnly ? 'translate-x-4' : 'translate-x-0.5'"
              ></div>
            </div>
            <span class="text-xs text-ink-300 tracking-wide">接受預約</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Empty state -->
      <div v-if="filteredArtists.length === 0" class="text-center py-24">
        <p class="text-ink-400 text-4xl mb-4">◌</p>
        <p class="text-ink-300 tracking-wide">找不到符合條件的刺青師</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArtistCard
          v-for="artist in filteredArtists"
          :key="artist.id"
          :artist="artist"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArtistCard from '@/components/artist/ArtistCard.vue'
import { mockArtists, STYLE_OPTIONS, CITY_OPTIONS } from '@/data/artists'

const search = ref('')
const selectedCity = ref('')
const selectedStyle = ref('')
const availableOnly = ref(false)

const filteredArtists = computed(() => {
  return mockArtists.filter((a) => {
    if (search.value && !a.name.toLowerCase().includes(search.value.toLowerCase()) &&
        !a.studioName.toLowerCase().includes(search.value.toLowerCase())) return false
    if (selectedCity.value && a.city !== selectedCity.value) return false
    if (selectedStyle.value && !a.styles.includes(selectedStyle.value)) return false
    if (availableOnly.value && !a.isAvailable) return false
    return true
  })
})
</script>
