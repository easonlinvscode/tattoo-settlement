<template>
  <div class="min-h-screen" v-if="artist">
    <!-- Hero cover -->
    <div class="relative h-64 md:h-80 overflow-hidden">
      <img :src="artist.coverImage" :alt="artist.name" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900"></div>
    </div>

    <!-- Profile header -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div class="flex flex-col sm:flex-row items-start sm:items-end gap-6">
        <img
          :src="artist.avatar"
          :alt="artist.name"
          class="w-24 h-24 rounded-full object-cover border-4 border-ink-900"
        />
        <div class="flex-1">
          <div class="flex items-center gap-3 flex-wrap">
            <h1 class="font-display text-2xl md:text-3xl text-parchment-100 tracking-wide">
              {{ artist.name }}
            </h1>
            <span
              class="text-[10px] px-2 py-1 tracking-widest uppercase"
              :class="artist.isAvailable ? 'bg-moss-700 text-moss-300' : 'bg-ink-700 text-ink-400'"
            >
              {{ artist.isAvailable ? '接受預約' : '暫停預約' }}
            </span>
          </div>
          <p class="text-ink-300 text-sm mt-1">{{ artist.studioName }} · {{ artist.city }}</p>
        </div>
        <!-- Actions -->
        <div class="flex gap-3 sm:pb-0">
          <button
            class="p-2 text-xl border border-ink-600 transition-all hover:border-parchment-300"
            :class="isFavorited ? 'text-wine-400' : 'text-ink-400'"
            @click="favorites.toggleArtist(artist.id)"
          >
            {{ isFavorited ? '♥' : '♡' }}
          </button>
          <RouterLink
            v-if="artist.isAvailable"
            :to="{ name: 'booking-requests', query: { artistId: artist.id } }"
            class="btn-wine text-xs"
          >
            預約諮詢
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-8">
          <!-- Stats -->
          <div class="card-dark p-5 grid grid-cols-3 gap-4">
            <div class="text-center">
              <p class="font-display text-xl text-parchment-100">{{ artist.workYears }}</p>
              <p class="text-[10px] text-ink-400 tracking-wider mt-1">年資</p>
            </div>
            <div class="text-center border-x border-ink-700">
              <p class="font-display text-xl text-parchment-100">{{ artist.rating }}</p>
              <p class="text-[10px] text-ink-400 tracking-wider mt-1">評分</p>
            </div>
            <div class="text-center">
              <p class="font-display text-xl text-parchment-100">{{ artist.bookingCount }}</p>
              <p class="text-[10px] text-ink-400 tracking-wider mt-1">服務數</p>
            </div>
          </div>

          <!-- Styles -->
          <div>
            <h3 class="label-dark mb-3">擅長風格</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="style in artist.styles"
                :key="style"
                class="tag-style text-xs text-parchment-200 border-ink-500"
              >
                {{ style }}
              </span>
            </div>
          </div>

          <!-- Price -->
          <div>
            <h3 class="label-dark mb-3">收費範圍</h3>
            <p class="text-parchment-100 text-sm">
              NT$ {{ artist.priceRange.min.toLocaleString() }}
              –
              {{ artist.priceRange.max.toLocaleString() }}
            </p>
            <p class="text-ink-400 text-xs mt-1">依作品尺寸與複雜度而定</p>
          </div>

          <!-- Social -->
          <div v-if="artist.socialLinks.instagram">
            <h3 class="label-dark mb-3">社群媒體</h3>
            <a
              :href="artist.socialLinks.instagram"
              target="_blank"
              class="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-parchment-100 transition-colors"
            >
              <span>IG</span>
              <span class="text-xs">@{{ artist.name.toLowerCase().replace(/\s/g, '_') }}</span>
            </a>
          </div>

          <!-- Intro -->
          <div>
            <h3 class="label-dark mb-3">關於我</h3>
            <p class="text-ink-200 text-sm leading-relaxed">{{ artist.intro }}</p>
          </div>
        </div>

        <!-- Portfolio Grid -->
        <div class="lg:col-span-2">
          <h2 class="font-display text-lg text-parchment-100 tracking-wide mb-6">
            作品集
            <span class="text-xs text-ink-400 ml-2 font-sans">{{ artistArtworks.length }} 件</span>
          </h2>

          <div v-if="artistArtworks.length === 0" class="text-center py-20 text-ink-500">
            尚無作品
          </div>

          <div v-else class="columns-2 md:columns-3 gap-3">
            <div
              v-for="artwork in artistArtworks"
              :key="artwork.id"
              class="break-inside-avoid mb-3"
            >
              <ArtworkCard :artwork="artwork" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen pt-32 flex items-center justify-center">
    <p class="text-ink-400">找不到此刺青師</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { mockArtists } from '@/data/artists'
import { mockArtworks } from '@/data/artworks'

const props = defineProps({ id: String })
const favorites = useFavoritesStore()

const artist = computed(() => mockArtists.find((a) => a.id === props.id))
const artistArtworks = computed(() => mockArtworks.filter((aw) => aw.artistId === props.id))
const isFavorited = computed(() => favorites.isArtistFavorited(props.id))
</script>
