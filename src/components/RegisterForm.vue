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
import Cookies from 'js-cookie'; // Importa la biblioteca js-cookie

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
                const response = await axios.post('http://localhost:8080/user/create', this.formData);

                if (response.status === 201) {
                    // Registro exitoso
                    console.log('Usuario registrado con éxito.', response.data);

                    const credentials = `${this.formData.username}:${this.formData.password}`;
                    const config = {
                        headers: {
                            Authorization: `Basic ${btoa(credentials)}`,
                        },
                    };

                    const responseToken = await axios.post('http://localhost:8080/token', null, config);
                    const token = responseToken.data;

                    // Almacena el token y los datos del usuario en el almacenamiento local
                    localStorage.setItem('token', token);
                    localStorage.setItem(`userData ` + this.formData.username, JSON.stringify(response.data));

                    // Redirige al usuario al inicio
                    this.$router.replace('/');
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