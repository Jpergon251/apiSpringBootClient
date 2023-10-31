import { createStore } from 'vuex';
import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:8080';
export default createStore({
  state: {
    user: {
      loggedIn: !!token,
    },
    token: token || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.user.loggedIn, // Devuelve true si el usuario está autenticado
  },
  mutations: {
    setUser(state, user) {
      state.user.loggedIn = true;
    },
    setToken(state, token) {
      state.token = token;
      state.user.loggedIn = true; // Establece el estado como autenticado cuando se tiene un token
    },
    logout(state) {
      state.user.loggedIn = false;
      state.token = null;
      localStorage.removeItem('token');

    },
  },
  actions: {

  },
  modules: {},
});