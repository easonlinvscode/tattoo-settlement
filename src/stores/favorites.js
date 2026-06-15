import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const artworkIds = ref([])
    const artistIds = ref([])

    const artworkCount = computed(() => artworkIds.value.length)
    const artistCount = computed(() => artistIds.value.length)

    function toggleArtwork(id) {
      const idx = artworkIds.value.indexOf(id)
      if (idx === -1) {
        artworkIds.value.push(id)
      } else {
        artworkIds.value.splice(idx, 1)
      }
    }

    function toggleArtist(id) {
      const idx = artistIds.value.indexOf(id)
      if (idx === -1) {
        artistIds.value.push(id)
      } else {
        artistIds.value.splice(idx, 1)
      }
    }

    function isArtworkFavorited(id) {
      return artworkIds.value.includes(id)
    }

    function isArtistFavorited(id) {
      return artistIds.value.includes(id)
    }

    return {
      artworkIds,
      artistIds,
      artworkCount,
      artistCount,
      toggleArtwork,
      toggleArtist,
      isArtworkFavorited,
      isArtistFavorited,
    }
  },
  { persist: true },
)
