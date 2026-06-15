<template>
  <div
    class="group card-dark cursor-pointer transition-all duration-300"
    @click="router.push({ name: 'artist-detail', params: { id: artist.id } })"
  >
    <!-- Cover -->
    <div class="relative overflow-hidden aspect-video">
      <img
        :src="artist.coverImage"
        :alt="artist.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent"></div>

      <!-- Availability badge -->
      <div class="absolute top-3 right-3">
        <span
          class="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2 py-1"
          :class="artist.isAvailable
            ? 'bg-moss-600/80 text-moss-300'
            : 'bg-ink-700/80 text-ink-400'"
        >
          <span class="w-1.5 h-1.5 rounded-full" :class="artist.isAvailable ? 'bg-moss-400' : 'bg-ink-500'"></span>
          {{ artist.isAvailable ? '接受預約' : '暫停預約' }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Header -->
      <div class="flex items-start gap-4 -mt-8 relative z-10">
        <img
          :src="artist.avatar"
          :alt="artist.name"
          class="w-14 h-14 rounded-full object-cover border-2 border-ink-800 flex-shrink-0"
        />
        <div class="flex-1 pt-8">
          <h3 class="font-display text-base text-parchment-100 tracking-wide">{{ artist.name }}</h3>
          <p class="text-xs text-ink-300 mt-0.5">{{ artist.studioName }} · {{ artist.city }}</p>
        </div>
        <!-- Favorite -->
        <button
          v-if="showFavorite"
          class="pt-8 text-lg transition-colors flex-shrink-0"
          :class="isFavorited ? 'text-wine-400' : 'text-ink-500 hover:text-parchment-100'"
          @click.stop="toggleFavorite"
        >
          {{ isFavorited ? '♥' : '♡' }}
        </button>
      </div>

      <!-- Styles -->
      <div class="flex flex-wrap gap-1.5 mt-4">
        <span
          v-for="style in artist.styles.slice(0, 3)"
          :key="style"
          class="tag-style text-[10px] text-ink-300 border-ink-600"
        >
          {{ style }}
        </span>
      </div>

      <!-- Stats -->
      <div class="flex items-center gap-4 mt-4 pt-4 border-t border-ink-700">
        <div class="text-center">
          <p class="text-parchment-100 font-medium text-sm">{{ artist.workYears }}</p>
          <p class="text-ink-400 text-[10px] tracking-wider">年資</p>
        </div>
        <div class="text-center">
          <p class="text-parchment-100 font-medium text-sm">{{ artist.bookingCount }}</p>
          <p class="text-ink-400 text-[10px] tracking-wider">作品數</p>
        </div>
        <div class="text-center">
          <p class="text-parchment-100 font-medium text-sm">{{ artist.rating }}</p>
          <p class="text-ink-400 text-[10px] tracking-wider">評分</p>
        </div>
        <div class="ml-auto text-right">
          <p class="text-parchment-200 text-xs">$ {{ artist.priceRange.min.toLocaleString() }} 起</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()
const favorites = useFavoritesStore()

const isFavorited = computed(() => favorites.isArtistFavorited(props.artist.id))

function toggleFavorite() {
  favorites.toggleArtist(props.artist.id)
}
</script>
