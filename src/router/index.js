import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // ── Public Layout ──────────────────────────────────────────────
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'explore',
          name: 'explore',
          component: () => import('@/views/ExploreView.vue'),
        },
        {
          path: 'artists',
          name: 'artists',
          component: () => import('@/views/ArtistsView.vue'),
        },
        {
          path: 'artworks/:id',
          name: 'artwork-detail',
          component: () => import('@/views/ArtworkDetailView.vue'),
          props: true,
        },
        {
          path: 'artists/:id',
          name: 'artist-detail',
          component: () => import('@/views/ArtistDetailView.vue'),
          props: true,
        },
      ],
    },

    // ── Auth Layout ────────────────────────────────────────────────
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },

    // ── Customer Routes ────────────────────────────────────────────
    {
      path: '/favorites',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requiresAuth: true, role: 'customer' },
      children: [
        {
          path: 'artworks',
          name: 'favorites-artworks',
          component: () => import('@/views/customer/FavoritesView.vue'),
          props: { tab: 'artworks' },
        },
        {
          path: 'artists',
          name: 'favorites-artists',
          component: () => import('@/views/customer/FavoritesView.vue'),
          props: { tab: 'artists' },
        },
      ],
    },
    {
      path: '/booking-requests',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requiresAuth: true, role: 'customer' },
      children: [
        {
          path: '',
          name: 'booking-requests',
          component: () => import('@/views/customer/BookingRequestsView.vue'),
        },
      ],
    },

    // ── Designer Routes ────────────────────────────────────────────
    {
      path: '/designer',
      component: () => import('@/layouts/DesignerLayout.vue'),
      meta: { requiresAuth: true, role: 'designer' },
      children: [
        {
          path: 'dashboard',
          name: 'designer-dashboard',
          component: () => import('@/views/designer/DashboardView.vue'),
        },
        {
          path: 'profile',
          name: 'designer-profile',
          component: () => import('@/views/designer/ProfileView.vue'),
        },
        {
          path: 'portfolio',
          name: 'designer-portfolio',
          component: () => import('@/views/designer/PortfolioView.vue'),
        },
        {
          path: 'requests',
          name: 'designer-requests',
          component: () => import('@/views/designer/RequestsView.vue'),
        },
      ],
    },

    // ── 404 ───────────────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guard
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
