<template>
  <div
    class="group relative overflow-hidden cursor-pointer bg-ink-800"
    @click="router.push({ name: 'artwork-detail', params: { id: artwork.id } })"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[3/4]">
      <img
        :src="artwork.coverImage"
        :alt="artwork.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-ink-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p class="text-parchment-100 font-display text-sm tracking-wide">{{ artwork.title }}</p>
        <p class="text-ink-200 text-xs mt-1">{{ artistName }}</p>
      </div>

      <!-- Favorite button -->
      <button
        v-if="showFavorite"
        class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
        :class="isFavorited ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
        @click.stop="toggleFavorite"
      >
        <span class="text-lg" :class="isFavorited ? 'text-wine-400' : 'text-parchment-100'">
          {{ isFavorited ? '♥' : '♡' }}
        </span>
      </button>

      <!-- Style tag -->
      <div class="absolute top-3 left-3">
        <span class="inline-block bg-ink-900/80 text-parchment-200 text-[10px] tracking-widest uppercase px-2 py-1">
          {{ artwork.style }}
        </span>
      </div>
    </div>

    <!-- Info (optional below image) -->
    <div v-if="showInfo" class="p-3">
      <h3 class="font-display text-sm text-parchment-100 tracking-wide truncate">{{ artwork.title }}</h3>
      <div class="flex items-center justify-between mt-1.5">
        <span class="text-xs text-ink-300">{{ artwork.bodyPart }} · {{ colorTypeLabel }}</span>
        <span class="text-xs text-ink-400 flex items-center gap-1">
          <span class="text-[10px]">♥</span>
          {{ artwork.likes }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { mockArtists } from '@/data/artists'

const props = defineProps({
  artwork: {
    type: Object,
    required: true,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
  showInfo: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const favorites = useFavoritesStore()

const isFavorited = computed(() => favorites.isArtworkFavorited(props.artwork.id))
const artistName = computed(() => {
  const artist = mockArtists.find((a) => a.id === props.artwork.artistId)
  return artist?.name || ''
})
const colorTypeLabel = computed(() => {
  return props.artwork.colorType === 'full-color' ? '全彩' : '黑灰'
})

function toggleFavorite() {
  favorites.toggleArtwork(props.artwork.id)
}
</script>
