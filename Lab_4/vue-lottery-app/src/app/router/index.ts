import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/ui/HomePage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/ui/LoginPage.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/pages/users/ui/UsersPage.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: ':id',
          name: 'user-details',
          component: () => import('@/pages/user-details/ui/UserDetailsPage.vue'),
          props: true,
        },
        {
          path: ':id/edit',
          name: 'user-edit',
          component: () => import('@/pages/user-edit/ui/UserEditPage.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/ui/AboutPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found/ui/NotFoundPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
