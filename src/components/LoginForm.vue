<template>
    <div>
        <form @submit.prevent="login">
            <div>
                <label for="username">Nombre de usuario</label>
                <input v-model="username" type="text" id="username" name="username" placeholder="Nombre de usuario"
                    required />
            </div>

            <div>
                <label for="password">Contraseña</label>
                <input v-model="password" type="password" id="password" name="password" placeholder="Contraseña" required />
            </div>

            <div>
                <button type="submit">Iniciar sesión</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {
    data() {
        return {
            username: '', // Cambiar de email a username
            password: '',
        };
    },
    methods: {
        async login() {
            const successfulLogin = await this.$store.dispatch('login', {
                username: this.username,
                password: this.password,
            });

            if (successfulLogin) {
                // Redirige al usuario al home
                this.$router.push({ name: 'home' });
            } else {
                // Maneja el error o muestra un mensaje de inicio de sesión fallido
            }
        },
    },

};
</script>