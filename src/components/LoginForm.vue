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
import router from '@/router/router';
import axios from 'axios';
export default {
    data() {
        return {
            username: '', // Cambiar de email a username
            password: '',
        };
    },
    methods: {
        async login() {
            try {

                const credentials = `${this.username}:${this.password}`;
                const base64Credentials = btoa(credentials);

                console.log(`${base64Credentials}`);

                const config = {
                    headers: {
                        Authorization: `Basic ${base64Credentials}`,
                    },
                };

                const response = await axios.post('http://localhost:8080/token', null, config);
                const token = response.data;

                if (response.status === 200) {

                    const userConfig = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                    const userResponse = await axios.get('http://localhost:8080/user/', userConfig);

                    console.log(userResponse);
                    // Verifica si la respuesta contiene usuarios
                    if (userResponse.data && userResponse.data.length > 0) {
                        const matchingUser = userResponse.data.find(user => user.username === this.username);

                        if (matchingUser) {
                            localStorage.setItem('token', token);// Guarda el token en el store
                            localStorage.setItem(`userData ` + matchingUser.username, JSON.stringify(matchingUser));


                        } else {
                            console.error('Credenciales inválidas');
                        }
                    } else {
                        console.error('No se encontraron usuarios');
                        return false; // Indica que no se encontraron usuarios
                    }
                    // Redirige al usuario al home
                    this.$router.replace('/');
                } else {
                    // Maneja el error o muestra un mensaje de inicio de sesión fallido
                    console.error(response.data);
                }
            } catch (error) {
                // Maneja el error de inicio de sesión
                console.error(error);
            }
        },
    },

};
</script>