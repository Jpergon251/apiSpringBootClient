import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../pages/NotFoundPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../pages/RegisterPage.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../pages/UserPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/equipos',
    name: 'Equipos',
    component: () => import('../pages/TeamsPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/equipos/:equipo',
    name: 'Equipo',
    component: () => import('../pages/PlayersPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/partidas',
    name: 'Partidas',
    component: () => import('../pages/MatchesPage.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.user.loggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
export default router