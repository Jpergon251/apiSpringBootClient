<template>
    <section class="login-container">
        <h2 class="login-title">Registro</h2>
        <p v-if="message" class="error-message">{{ message }}</p>
        <form @submit.prevent="register" class="login-form">
            <label for="username" class="login-label">Nombre de usuario</label>
            <input v-model="formData.username" type="text" id="username" name="username" required class="login-input" />

            <label for="email" class="login-label">Correo electrónico</label>
            <input v-model="formData.email" type="email" id="email" name="email" required class="login-input" />

            <label for="password" class="login-label">Contraseña</label>
            <input v-model="formData.password" type="password" id="password" name="password" class="login-input" />

            <button type="submit" class="login-button">Registrarse</button>
        </form>
        <router-link to="/login" class="login-link">¿Ya tienes cuenta?</router-link>
    </section>
</template>

<script>
import axios from 'axios';
import store from '@/store/store';
export default {
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
            },
            message: '',
        };
    },

    methods: {

        async register() {
            this.message = '';
            try {
                const response = await axios.post('http://localhost:8080/users/create', this.formData);

                if (response.status === 201) {
                    // Registro exitoso
                    console.log('Usuario registrado con éxito.', response.data);

                    // Lleva a la página de inicio de sesión
                    this.$router.push('/login');
                } else {
                    // Otro error
                    console.error('Error al registrar al usuario:', response.data);
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // Error de validación
                    this.message = error.response.data;
                    console.error('Error de validación:', error.response.data);
                }
            }
        },
    },
};
</script>