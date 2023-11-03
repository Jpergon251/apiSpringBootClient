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
import store from '@/store/store';
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            username: '', // Cambiar de email a username
            password: '',
        };
    },
    methods: {
        async login() {

            console.log(store.state.loggedIn);

            const credentials = `${this.username}:${this.password}`;
            const base64Credentials = btoa(credentials);

            console.log(`${base64Credentials}`);

            const config = {
                headers: {
                    Authorization: `Basic ${base64Credentials}`,
                },
            };
            try {



                const response = await axios.post('http://localhost:8080/token', null, config);
                const token = response.data;

                if (response.status === 200) {

                    const userConfig = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                    try {
                        const userResponse = await axios.get('http://localhost:8080/users/dto/', userConfig);
                        if (userResponse.data && userResponse.data.length > 0) {
                            const matchingUser = userResponse.data.find(user => user.username === this.username);

                            if (matchingUser) {

                                const user = {
                                    id: matchingUser.id,
                                    username: matchingUser.username,
                                    email: matchingUser.email,
                                    // otros datos del usuario
                                };

                                store.commit('setUser', user);


                                Cookies.set('session', JSON.stringify({ 'id': matchingUser.id, 'username': matchingUser.username, 'token': token, 'role': matchingUser.role }));
                                // Redirige al usuario al home
                                window.location.href = '/';
                            } else {
                                console.error('Credenciales inválidas');
                            }
                        } else {
                            console.error('No se encontraron usuarios');
                            return false; // Indica que no se encontraron usuarios
                        }
                    } catch (userError) {
                        console.error(userError);
                    }



                    console.log(userResponse);
                    // Verifica si la respuesta contiene usuarios




                } else {
                    // Maneja el error o muestra un mensaje de inicio de sesión fallido
                    console.error(response.data);
                }
            } catch (tokenError) {
                console.error(tokenError);
            }
        },
    },

};
</script>