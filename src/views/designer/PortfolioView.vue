<template>
  <div class="p-8">
    <div class="flex items-start justify-between mb-10">
      <div>
        <p class="text-xs text-ink-400 tracking-[0.3em] uppercase mb-2">Portfolio</p>
        <h1 class="font-display text-2xl text-parchment-100 tracking-wide">我的作品集</h1>
        <p class="text-ink-300 text-sm mt-1">{{ myArtworks.length }} 件作品</p>
      </div>
      <button @click="showUploadModal = true" class="btn-wine text-xs">
        ＋ 上傳新作品
      </button>
    </div>

    <!-- Upload Modal -->
    <Transition name="modal">
      <div
        v-if="showUploadModal"
        class="fixed inset-0 bg-ink-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="showUploadModal = false"
      >
        <div class="bg-ink-800 border border-ink-700 w-full max-w-lg p-8 animate-slide-up">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-lg text-parchment-100 tracking-wide">上傳作品</h2>
            <button @click="showUploadModal = false" class="text-ink-400 hover:text-parchment-100 transition-colors">✕</button>
          </div>

          <form @submit.prevent="handleUpload" class="space-y-5">
            <!-- Image placeholder -->
            <div class="border-2 border-dashed border-ink-600 p-12 text-center hover:border-ink-500 transition-colors cursor-pointer">
              <p class="text-4xl text-ink-600 mb-3">◉</p>
              <p class="text-sm text-ink-400">點擊上傳或拖放圖片</p>
              <p class="text-xs text-ink-600 mt-1">JPG、PNG，最大 10MB</p>
            </div>

            <div>
              <label class="label-dark">作品標題</label>
              <input v-model="uploadForm.title" type="text" class="input-dark" required />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label-dark">風格</label>
                <select v-model="uploadForm.style" class="input-dark">
                  <option v-for="s in STYLE_OPTIONS" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div>
                <label class="label-dark">部位</label>
                <select v-model="uploadForm.bodyPart" class="input-dark">
                  <option v-for="opt in BODY_PART_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label-dark">色系</label>
                <select v-model="uploadForm.colorType" class="input-dark">
                  <option value="black-grey">黑灰</option>
                  <option value="full-color">全彩</option>
                </select>
              </div>
              <div>
                <label class="label-dark">尺寸</label>
                <select v-model="uploadForm.sizeType" class="input-dark">
                  <option value="small">小型</option>
                  <option value="medium">中型</option>
                  <option value="large">大型</option>
                </select>
              </div>
            </div>

            <div>
              <label class="label-dark">作品說明</label>
              <textarea v-model="uploadForm.description" rows="3" class="input-dark resize-none"></textarea>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="showUploadModal = false" class="btn-outline flex-1 text-xs">取消</button>
              <button type="submit" class="btn-primary flex-1 text-xs">確認上傳</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Empty state -->
    <div v-if="myArtworks.length === 0" class="text-center py-24">
      <p class="text-ink-400 text-4xl mb-4">◉</p>
      <p class="text-ink-300">尚未上傳任何作品</p>
      <button @click="showUploadModal = true" class="mt-4 btn-outline text-xs">上傳第一件作品</button>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="artwork in myArtworks"
        :key="artwork.id"
        class="group relative aspect-square overflow-hidden bg-ink-800 cursor-pointer"
      >
        <img
          :src="artwork.coverImage"
          :alt="artwork.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p class="text-parchment-100 text-xs font-display tracking-wide">{{ artwork.title }}</p>
          <p class="text-ink-300 text-[10px] mt-0.5">{{ artwork.style }}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-[10px] text-ink-300 flex items-center gap-1">♥ {{ artwork.likes }}</span>
            <button class="text-[10px] text-wine-400 hover:text-wine-300 tracking-wider">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mockArtworks, BODY_PART_OPTIONS } from '@/data/artworks'
import { STYLE_OPTIONS } from '@/data/artists'

const auth = useAuthStore()
const showUploadModal = ref(false)

const myArtworks = computed(() =>
  mockArtworks.filter((aw) => aw.artistId === auth.user?.artistId),
)

const uploadForm = ref({
  title: '',
  style: 'Neo Traditional',
  bodyPart: '手臂',
  colorType: 'black-grey',
  sizeType: 'medium',
  description: '',
})

function handleUpload() {
  // In production: call API
  alert('作品上傳功能需串接後端 API，Demo 模式不支援實際上傳。')
  showUploadModal.value = false
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
