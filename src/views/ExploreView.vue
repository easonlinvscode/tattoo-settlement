<template>
  <div class="pt-20">
    <!-- Header -->
    <div class="py-14 border-b border-ink-800 bg-ink-950/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">Explore</p>
        <h1 class="section-title">探索作品</h1>
        <p class="text-ink-300 mt-3 text-sm">{{ filteredArtworks.length }} 件作品</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="sticky top-16 z-40 bg-ink-900/95 backdrop-blur-md border-b border-ink-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
          <!-- Style filter -->
          <div class="flex gap-2 flex-shrink-0">
            <button
              v-for="opt in STYLE_FILTER_OPTIONS"
              :key="opt.value"
              class="text-xs tracking-wider uppercase px-3 py-1.5 border transition-all duration-200 flex-shrink-0"
              :class="filters.style === opt.value
                ? 'bg-parchment-100 text-ink-900 border-parchment-100'
                : 'border-ink-700 text-ink-300 hover:border-parchment-300 hover:text-parchment-100'"
              @click="filters.style = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Secondary filters row -->
        <div class="flex flex-wrap gap-3 mt-3">
          <select v-model="filters.bodyPart" class="input-dark text-xs py-1.5 px-3 w-auto">
            <option v-for="opt in BODY_PART_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <select v-model="filters.colorType" class="input-dark text-xs py-1.5 px-3 w-auto">
            <option v-for="opt in COLOR_TYPE_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <select v-model="filters.size" class="input-dark text-xs py-1.5 px-3 w-auto">
            <option v-for="opt in SIZE_TYPE_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-xs text-wine-400 hover:text-wine-300 tracking-wider transition-colors"
          >
            清除篩選
          </button>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Empty state -->
      <div v-if="filteredArtworks.length === 0" class="text-center py-24">
        <p class="text-ink-400 text-4xl mb-4">◌</p>
        <p class="text-ink-300 tracking-wide">沒有符合條件的作品</p>
        <button @click="clearFilters" class="mt-4 btn-ghost text-sm">清除篩選</button>
      </div>

      <!-- Masonry -->
      <div v-else class="columns-2 md:columns-3 lg:columns-4 gap-3">
        <div
          v-for="artwork in filteredArtworks"
          :key="artwork.id"
          class="break-inside-avoid mb-3"
        >
          <ArtworkCard :artwork="artwork" show-info />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'
import { mockArtworks, STYLE_FILTER_OPTIONS, BODY_PART_OPTIONS, COLOR_TYPE_OPTIONS, SIZE_TYPE_OPTIONS } from '@/data/artworks'

const filters = ref({
  style: '',
  bodyPart: '',
  colorType: '',
  size: '',
})

const hasActiveFilters = computed(() =>
  Object.values(filters.value).some((v) => v !== ''),
)

function clearFilters() {
  filters.value = { style: '', bodyPart: '', colorType: '', size: '' }
}

const filteredArtworks = computed(() => {
  return mockArtworks.filter((aw) => {
    if (filters.value.style && aw.style !== filters.value.style) return false
    if (filters.value.bodyPart && aw.bodyPart !== filters.value.bodyPart) return false
    if (filters.value.colorType && aw.colorType !== filters.value.colorType) return false
    if (filters.value.size && aw.sizeType !== filters.value.size) return false
    return true
  })
})
</script>
