<template>
  <div class="pt-20 min-h-screen">
    <!-- 404 -->
    <div v-if="!artwork" class="flex items-center justify-center py-40 text-ink-400">
      <p>找不到此作品</p>
    </div>

    <template v-else>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <!-- Images -->
          <div class="space-y-3">
            <!-- Main image -->
            <div class="overflow-hidden">
              <img
                :src="selectedImage"
                :alt="artwork.title"
                class="w-full object-cover max-h-[70vh]"
              />
            </div>
            <!-- Thumbnails -->
            <div v-if="artwork.images.length > 1" class="flex gap-2 overflow-x-auto">
              <button
                v-for="(img, i) in artwork.images"
                :key="i"
                class="w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-all"
                :class="selectedImage === img ? 'border-parchment-200' : 'border-transparent opacity-50 hover:opacity-80'"
                @click="selectedImage = img"
              >
                <img :src="img" :alt="`Image ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Info -->
          <div class="lg:sticky lg:top-24 lg:self-start">
            <!-- Breadcrumb -->
            <div class="flex items-center gap-2 text-xs text-ink-400 tracking-wider mb-8">
              <RouterLink to="/explore" class="hover:text-parchment-100 transition-colors">探索作品</RouterLink>
              <span>›</span>
              <span>{{ artwork.style }}</span>
            </div>

            <!-- Title -->
            <h1 class="font-display text-3xl text-parchment-100 tracking-wide">{{ artwork.title }}</h1>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="tag in artwork.tags"
                :key="tag"
                class="tag-style text-[10px] text-ink-300 border-ink-600 hover:border-parchment-300 hover:text-parchment-200 cursor-default transition-colors"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Meta -->
            <div class="mt-8 space-y-4 py-8 border-y border-ink-700">
              <div class="flex justify-between text-sm">
                <span class="text-ink-400 tracking-wider">風格</span>
                <span class="text-parchment-200">{{ artwork.style }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-ink-400 tracking-wider">部位</span>
                <span class="text-parchment-200">{{ artwork.bodyPart }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-ink-400 tracking-wider">色系</span>
                <span class="text-parchment-200">{{ artwork.colorType === 'full-color' ? '全彩' : '黑灰' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-ink-400 tracking-wider">尺寸</span>
                <span class="text-parchment-200">{{ sizeLabel }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-ink-400 tracking-wider">完成時間</span>
                <span class="text-parchment-200">{{ formattedDate }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-ink-200 text-sm leading-relaxed mt-6">{{ artwork.description }}</p>

            <!-- Likes -->
            <div class="flex items-center gap-2 mt-6">
              <button
                class="flex items-center gap-2 text-sm transition-colors"
                :class="isFavorited ? 'text-wine-400' : 'text-ink-400 hover:text-parchment-100'"
                @click="favorites.toggleArtwork(artwork.id)"
              >
                <span class="text-xl">{{ isFavorited ? '♥' : '♡' }}</span>
                <span>{{ artwork.likes + (isFavorited ? 1 : 0) }}</span>
              </button>
            </div>

            <!-- Artist CTA -->
            <div
              v-if="artist"
              class="mt-10 p-5 card-dark cursor-pointer group"
              @click="router.push({ name: 'artist-detail', params: { id: artist.id } })"
            >
              <p class="text-[10px] text-ink-400 tracking-widest uppercase mb-3">刺青師</p>
              <div class="flex items-center gap-4">
                <img
                  :src="artist.avatar"
                  :alt="artist.name"
                  class="w-12 h-12 rounded-full object-cover border border-ink-600"
                />
                <div class="flex-1">
                  <p class="font-display text-sm text-parchment-100 group-hover:text-parchment-50 transition-colors">
                    {{ artist.name }}
                  </p>
                  <p class="text-xs text-ink-300 mt-0.5">{{ artist.studioName }} · {{ artist.city }}</p>
                </div>
                <span class="text-ink-400 group-hover:text-parchment-100 transition-colors">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { mockArtworks } from '@/data/artworks'
import { mockArtists } from '@/data/artists'

const props = defineProps({ id: String })
const router = useRouter()
const favorites = useFavoritesStore()

const artwork = computed(() => mockArtworks.find((a) => a.id === props.id))
const artist = computed(() => artwork.value ? mockArtists.find((a) => a.id === artwork.value.artistId) : null)
const selectedImage = ref(artwork.value?.coverImage || '')
const isFavorited = computed(() => favorites.isArtworkFavorited(props.id))

const sizeLabel = computed(() => {
  const map = { small: '小型 (手掌以下)', medium: '中型 (手掌~A4)', large: '大型 (A4以上)' }
  return map[artwork.value?.sizeType] || artwork.value?.sizeType
})

const formattedDate = computed(() => {
  if (!artwork.value) return ''
  const d = new Date(artwork.value.createdAt)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`
})
</script>
