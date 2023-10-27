import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      loggedIn: false, // Inicializa loggedIn como falso
      // Otros datos de usuario
    },
    token: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.user.loggedIn, // Devuelve true si el usuario está autenticado
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // Establece el objeto de usuario
    },
    setToken(state, token) {
      state.token = token; // Establece el token de autenticación
    },
    logout(state) {
      state.user.loggedIn = false; // Establece loggedIn en falso al cerrar sesión

      state.user = null; // Elimina el objeto de usuario al cerrar sesión
      state.token = null; // Elimina el token de autenticación al cerrar sesión
    },
  },
  actions: {
    // Define acciones para iniciar sesión, cerrar sesión, etc.
    async login({ commit }, { email, password }) {
      try {
        // Realiza la solicitud al servidor para iniciar sesión
        // Recibe el token y los datos del usuario
        // Guarda el token y los datos del usuario en el estado
        commit('setUser', userData);
        commit('setToken', authToken);
      } catch (error) {
        // Maneja el error, muestra un mensaje de error, etc.
        console.error('Error de inicio de sesión:', error);
      }
    },
    logout({ commit }) {
      // Elimina el token y los datos del usuario al cerrar sesión
      commit('logout');
    },
  },
  modules: {},
});