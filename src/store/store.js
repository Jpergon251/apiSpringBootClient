import { createStore } from 'vuex';
import axios from 'axios';
const userData = JSON.parse(localStorage.getItem('userData'));
const token = localStorage.getItem('token');

export default createStore({
  state: {
    user: {
      loggedIn: userData !== null,
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
      localStorage.removeItem('userData');
    },
  },
  actions: {
    // Define acciones para iniciar sesión, cerrar sesión, etc.
    async login({ commit }, { username, password }) {
      try {
        const credentials = `${username}:${password}`;
        const base64Credentials = btoa(credentials);

        console.log(`${base64Credentials}`);
        const config = {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        };

        const response = await axios.post('/token', null, config);
        const token = response.data;
        localStorage.setItem('token', token);

        const userConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const userResponse = await axios.get('/user/', userConfig);

        console.log(userResponse);
        // Verifica si la respuesta contiene usuarios
        if (userResponse.data && userResponse.data.length > 0) {
          const matchingUser = userResponse.data.find(user => user.username === username);

          if (matchingUser) {
            commit('setUser', matchingUser); // Guarda la información del usuario en el store
            commit('setToken', token); // Guarda el token en el store
            localStorage.setItem('userData', JSON.stringify(matchingUser));
            return true; // Indica que el inicio de sesión fue exitoso
          } else {
            console.error('Credenciales inválidas');
            return false; // Indica que las credenciales son inválidas
          }
        } else {
          console.error('No se encontraron usuarios');
          return false; // Indica que no se encontraron usuarios
        }
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        return false; // Maneja el error y devuelve un indicador de inicio de sesión fallido
      }
    }
  },
  modules: {},
});