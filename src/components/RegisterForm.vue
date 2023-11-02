<template>
    <div>
        <p class="error-message">{{ message }}</p>
        <input v-model="formData.username" placeholder="Nombre de usuario" required />
        <input v-model="formData.email" placeholder="Correo electrónico" required />
        <input v-model="formData.password" type="password" placeholder="Contraseña" required />
        <button @click="register">Registrarse</button>
    </div>
</template>

<script>
import axios from 'axios';

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
            try {
                const response = await axios.post('http://localhost:8080/users/create', this.formData);

                if (response.status === 201) {
                    // Registro exitoso
                    console.log('Usuario registrado con éxito.', response.data);

                    // Lleva a la página de inicio de sesión
                    this.$router.push('/login');
                } else {
                    // Muestra un mensaje de error o maneja el error de alguna otra manera.
                    console.error(response.data);
                }
            } catch (error) {
                this.message = error.response.data;
                console.error('Error al registrar al usuario:', error.response.data);
            }
        },
    },
};
</script>