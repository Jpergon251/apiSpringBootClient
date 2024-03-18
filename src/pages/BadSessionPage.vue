<template>
  <p>
    Parece que tu sesion es erronea, borra tus Cookies y vuelve a iniciar sesion
  </p>
  <button type="button" @click="deleteCookies()">Borrar Cookies</button>
</template>

<script>
import Cookies from "js-cookie";
export default {
  methods: {
    deleteCookies() {
      Cookies.remove("session");
      window.location.href = "/";
    },
  },
};
</script>
