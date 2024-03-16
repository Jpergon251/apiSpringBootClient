import { createStore } from 'vuex';
import Cookies from 'js-cookie';


const cookieValue = Cookies.get('session');
const decodedCookie = cookieValue ? JSON.parse(cookieValue) : {};


export default createStore({
  state: {
    user: {

    },
    token: decodedCookie.token || null,
    sessionData: {
      id: decodedCookie?.id,
      username: decodedCookie.username,
      role: decodedCookie.role
    },
    loggedIn: !!decodedCookie.token,


  },
  getters: {
    isLoggedIn: (state) => !!state.loggedIn, // Devuelve true si el usuario está autenticado

  },

  actions: {
  },
  modules: {},
});