<template>
    <div>
        <p v-if="message" class="error-message">{{ message }}</p>
        <input v-model="formData.username" placeholder="Nombre de usuario" required />
        <input v-model="formData.email" placeholder="Correo electrónico" required />
        <input v-model="formData.password" type="password" placeholder="Contraseña" required />
        <button @click="register">Registrarse</button>
    </div>
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