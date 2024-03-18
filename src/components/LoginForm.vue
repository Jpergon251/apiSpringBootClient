<template>
  <section class="login-container">
    <h1 class="login-title">Iniciar sesión</h1>
    <p v-if="message" class="login-message">{{ message }}</p>
    <form @submit.prevent="login" class="login-form">
      <label for="username" class="login-label">Nombre de usuario</label>
      <input
        v-model="username"
        type="text"
        id="username"
        name="username"
        required
        class="login-input"
      />

      <label for="password" class="login-label">Contraseña</label>
      <input
        v-model="password"
        type="password"
        id="password"
        name="password"
        required
        class="login-input"
      />

      <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
    88amp-udBCE
    <router-link to="/registro" class="login-link"
      >¿No tienes cuenta?</router-link
    >
  </section>
</template>

<script>
import router from "@/router/router";
import store from "@/store/store";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login() {
      const credentials = `${this.username}:${this.password}`;
      const base64Credentials = btoa(credentials);

      const config = {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/token",
          null,
          config
        );
        const token = response.data;

        if (response.status === 200) {
          const userConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          try {
            const userResponse = await axios.get(
              "http://localhost:8080/users/dto/",
              userConfig
            );
            if (userResponse.data && userResponse.data.length > 0) {
              const matchingUser = userResponse.data.find(
                (user) => user.username === this.username
              );

              if (matchingUser) {
                if (matchingUser.role === "BANNED") {
                  window.location.href = "/blocked";
                } else {
                  Cookies.set(
                    "session",
                    JSON.stringify({
                      id: matchingUser.id,
                      username: matchingUser.username,
                      token: token,
                      role: matchingUser.role,
                    })
                  );
                  // Redirige al usuario al home
                  window.location.href = "/";
                }
              }
            }
          } catch (userError) {
            // console.error(userError);
          }
        } else {
          // Maneja el error o muestra un mensaje de inicio de sesión fallido
          // console.error(response.data);
        }
      } catch (tokenError) {
        if (tokenError.response.status === 401) {
          this.message = "Usuario o contraseña incorrectos";
          // console.error(tokenError);
        } else {
          // console.error(tokenError);
        }
      }
    },
  },
};
</script>
