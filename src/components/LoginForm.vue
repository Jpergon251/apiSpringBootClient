<template>
    <div>
        <form @submit="login">
            <input v-model="username" type="text" placeholder="Nombre de usuario" required />
            <input v-model="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>

        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173'; // Reemplaza con la URL de tu aplicación Vue.js

axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default {
    data() {
        return {
            username: '', // Cambiar de email a username
            password: '',
        };
    },
    methods: {
        async login(event) {
            event.preventDefault();
            try {
                const credentials = this.username + ':' + this.password;
                const base64Credentials = btoa(credentials);

                const config = {
                    headers: {
                        Authorization: 'Basic ' + base64Credentials,
                    },
                };

                const response = await axios.post('http://localhost:8080/token', null, config);

                const token = response.data;
                localStorage.setItem('token', token);
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.error('Error de inicio de sesión:', error);
            }
        },
    },
};
</script>