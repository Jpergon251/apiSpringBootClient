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
    path: '/badsession',
    name: 'BadSession',
    component: () => import('../pages/BadSessionPage.vue')
  },
  {
    path: '/blocked',
    name: 'Blocked',
    component: () => import('../pages/BlockedUserPage.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../pages/ProfilePage.vue'),
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
    path: '/equipos/:id',
    name: 'Equipo',
    component: () => import('../pages/TeamPlayersPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/jugadores/:id',
    name: 'Jugador',
    component: () => import('../pages/PlayerPage.vue'),
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
    if (store.state.loggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
export default router
