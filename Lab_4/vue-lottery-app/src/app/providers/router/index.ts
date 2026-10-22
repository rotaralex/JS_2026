import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Головна - Vue Lottery App', layout: 'default' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Про автора - Vue Lottery App', layout: 'default' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Авторизація - Vue Lottery App', layout: 'auth' },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UsersView.vue'),
    meta: { title: 'Користувачі - Vue Lottery App', requiresAuth: true, layout: 'default' },
    children: [
      {
        path: ':id',
        name: 'user-details',
        component: () => import('@/views/UserDetailsView.vue'),
        props: true,
      },
      {
        path: ':id/edit',
        name: 'user-edit',
        component: () => import('@/views/UserEditView.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 - Сторінку не знайдено' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'users' }
  }
})

// Оновлення meta.title
router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Vue Lottery App'
})

export default router
