<template>
  <div class="pt-20">
    <!-- Header -->
    <div class="py-14 border-b border-ink-800">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">My Favorites</p>
        <h1 class="section-title">我的收藏</h1>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-ink-800">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
        <RouterLink
          to="/favorites/artworks"
          class="px-6 py-4 font-display text-xs tracking-[0.2em] uppercase border-b-2 transition-colors"
          :class="activeTab === 'artworks'
            ? 'border-parchment-100 text-parchment-100'
            : 'border-transparent text-ink-400 hover:text-ink-200'"
        >
          作品
          <span class="ml-2 text-[10px] text-ink-500">{{ favorites.artworkCount }}</span>
        </RouterLink>
        <RouterLink
          to="/favorites/artists"
          class="px-6 py-4 font-display text-xs tracking-[0.2em] uppercase border-b-2 transition-colors"
          :class="activeTab === 'artists'
            ? 'border-parchment-100 text-parchment-100'
            : 'border-transparent text-ink-400 hover:text-ink-200'"
        >
          刺青師
          <span class="ml-2 text-[10px] text-ink-500">{{ favorites.artistCount }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Artworks tab -->
      <template v-if="activeTab === 'artworks'">
        <div v-if="favoritedArtworks.length === 0" class="text-center py-24">
          <p class="text-ink-400 text-4xl mb-4">♡</p>
          <p class="text-ink-300">尚未收藏任何作品</p>
          <RouterLink to="/explore" class="mt-4 inline-block btn-outline text-xs">探索作品</RouterLink>
        </div>
        <div v-else class="columns-2 md:columns-3 lg:columns-4 gap-3">
          <div v-for="artwork in favoritedArtworks" :key="artwork.id" class="break-inside-avoid mb-3">
            <ArtworkCard :artwork="artwork" show-info />
          </div>
        </div>
      </template>

      <!-- Artists tab -->
      <template v-else>
        <div v-if="favoritedArtists.length === 0" class="text-center py-24">
          <p class="text-ink-400 text-4xl mb-4">♡</p>
          <p class="text-ink-300">尚未收藏任何刺青師</p>
          <RouterLink to="/artists" class="mt-4 inline-block btn-outline text-xs">找刺青師</RouterLink>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArtistCard v-for="artist in favoritedArtists" :key="artist.id" :artist="artist" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'
import ArtistCard from '@/components/artist/ArtistCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { mockArtworks } from '@/data/artworks'
import { mockArtists } from '@/data/artists'

const props = defineProps({ tab: String })
const route = useRoute()
const favorites = useFavoritesStore()

const activeTab = computed(() => route.path.includes('artists') ? 'artists' : 'artworks')

const favoritedArtworks = computed(() =>
  mockArtworks.filter((aw) => favorites.isArtworkFavorited(aw.id)),
)
const favoritedArtists = computed(() =>
  mockArtists.filter((a) => favorites.isArtistFavorited(a.id)),
)
</script>
