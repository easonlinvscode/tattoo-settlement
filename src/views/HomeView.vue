<template>
  <div class="animate-fade-in">
    <!-- ── HERO ──────────────────────────────────────────────────── -->
    <section class="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <img
          src="https://picsum.photos/seed/hero-bg/1920/1080"
          alt="Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/20 to-ink-900"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <div class="max-w-2xl animate-slide-up">
          <p class="font-display text-xs text-wine-400 tracking-[0.4em] uppercase mb-6">
            塔圖聚落 · Tattoo Settlement
          </p>
          <h1 class="font-display text-5xl md:text-7xl text-parchment-100 leading-none tracking-wide mb-6">
            刺青是<br />你的第<br />二張臉
          </h1>
          <p class="text-ink-200 text-base md:text-lg font-light leading-relaxed max-w-md mb-10">
            探索台灣頂尖刺青師的作品，找到最懂你的那一位。
            每一針，都是一段故事的開始。
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/explore" class="btn-primary">
              探索作品
            </RouterLink>
            <RouterLink to="/artists" class="btn-outline">
              尋找刺青師
            </RouterLink>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2">
          <span class="text-[10px] text-ink-400 tracking-[0.3em] uppercase writing-mode-vertical">Scroll</span>
          <div class="w-px h-12 bg-gradient-to-b from-ink-400 to-transparent"></div>
        </div>
      </div>
    </section>

    <!-- ── STATS ─────────────────────────────────────────────────── -->
    <section class="bg-ink-950 border-y border-ink-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-3 divide-x divide-ink-800">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center px-6 py-4"
          >
            <p class="font-display text-3xl md:text-4xl text-parchment-100">{{ stat.value }}</p>
            <p class="text-xs text-ink-400 tracking-widest uppercase mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURED ARTWORKS ─────────────────────────────────────── -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between mb-12">
        <div>
          <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">精選作品</p>
          <h2 class="section-title">近期力作</h2>
        </div>
        <RouterLink to="/explore" class="hidden sm:inline-flex btn-ghost text-xs items-center gap-2">
          查看全部 <span class="text-lg leading-none">→</span>
        </RouterLink>
      </div>

      <!-- Masonry Grid -->
      <div class="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        <div
          v-for="artwork in featuredArtworks"
          :key="artwork.id"
          class="break-inside-avoid mb-3"
        >
          <ArtworkCard :artwork="artwork" />
        </div>
      </div>

      <div class="mt-10 text-center sm:hidden">
        <RouterLink to="/explore" class="btn-outline text-xs">查看全部作品</RouterLink>
      </div>
    </section>

    <!-- ── FEATURED ARTISTS ──────────────────────────────────────── -->
    <section class="py-24 bg-ink-950/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">聚落成員</p>
            <h2 class="section-title">頂尖刺青師</h2>
          </div>
          <RouterLink to="/artists" class="hidden sm:inline-flex btn-ghost text-xs items-center gap-2">
            查看全部 <span class="text-lg leading-none">→</span>
          </RouterLink>
        </div>

        <!-- Horizontal scroll on mobile -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArtistCard
            v-for="artist in featuredArtists"
            :key="artist.id"
            :artist="artist"
          />
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://picsum.photos/seed/cta-bg/1920/600"
          alt=""
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-ink-900/70"></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-4">Are you an Artist?</p>
        <h2 class="font-display text-4xl md:text-5xl text-parchment-100 tracking-wide mb-6">
          展示你的作品，<br />讓世界看見你
        </h2>
        <p class="text-ink-200 mb-10 max-w-lg mx-auto">
          加入塔圖聚落，建立你的專屬頁面，展示作品集，接受來自全台顧客的預約詢問。
        </p>
        <RouterLink to="/auth/register" class="btn-wine">
          刺青師加入申請
        </RouterLink>
      </div>
    </section>

    <!-- ── HOW IT WORKS ──────────────────────────────────────────── -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <p class="text-xs text-wine-400 tracking-[0.4em] uppercase mb-3">How it works</p>
        <h2 class="section-title">如何使用</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <!-- Connector line (desktop) -->
        <div class="hidden md:block absolute top-6 left-1/6 right-1/6 h-px bg-ink-700 z-0"></div>

        <div
          v-for="(step, i) in steps"
          :key="i"
          class="relative text-center z-10"
        >
          <div class="w-12 h-12 border border-ink-600 flex items-center justify-center mx-auto mb-6 bg-ink-900">
            <span class="font-display text-parchment-100 text-lg">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <h3 class="font-display text-base text-parchment-100 tracking-wider mb-3">{{ step.title }}</h3>
          <p class="text-ink-300 text-sm leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'
import ArtistCard from '@/components/artist/ArtistCard.vue'
import { mockArtworks } from '@/data/artworks'
import { mockArtists } from '@/data/artists'

// Featured: highest liked
const featuredArtworks = computed(() =>
  [...mockArtworks].sort((a, b) => b.likes - a.likes).slice(0, 8),
)

const featuredArtists = computed(() =>
  mockArtists.filter((a) => a.isAvailable).slice(0, 3),
)

const stats = [
  { value: '6+', label: '頂尖刺青師' },
  { value: '12+', label: '精選作品' },
  { value: '500+', label: '滿意顧客' },
]

const steps = [
  {
    title: '探索作品',
    desc: '瀏覽來自全台各地風格各異的刺青作品，找到最能打動你的美學方向。',
  },
  {
    title: '選擇刺青師',
    desc: '查看刺青師個人頁面，了解其風格專長、城市與收費範圍，找到你的心儀對象。',
  },
  {
    title: '送出預約',
    desc: '填寫預約需求表單，告訴刺青師你的想法，開啟屬於你的刺青旅程。',
  },
]
</script>
