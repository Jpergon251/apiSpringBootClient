<template>
    <div>
        <SingOutBut />

        <h2>Rol: </h2>
        <p>{{ user.role }}</p>
        <h2>Nombre de usuario: </h2>
        <p>{{ user.username }}</p>
        <h2>Email: </h2>
        <p>{{ user.email }}</p>
        <h2>Jugadores Favoritos</h2>
        <p>{{ user.jugadoresFavoritos }}</p>
        <button v-if="isAdmin" @click="getUsers(), isShowed = !isShowed">
            {{ isShowed ? 'Ocultar lista de usuarios' : 'Mostrar lista deusuarios' }}
        </button>


        <ul v-if="isShowed">
            <h3>Usuarios</h3>
            <li v-for="user in users" :key="user.id">
                {{ user.username }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import SingOutBut from '../components/SingOutBut.vue'
import store from '@/store/store';
import router from '@/router/router';
export default {
    data() {
        return {
            user: {

            },
            isAdmin: false,
            users: [],
            isShowed: false
        }
    },
    created() {
        this.loadUser();
    },
    methods: {
        async loadUser() {


            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`,
                }
            }
            try {
                const response = await axios.get('http://localhost:8080/users/dto/' + store.state.sessionData.id, config);
                if (response.status == 200) {
                    this.user = response.data;
                    if (this.user.role == 'ADMIN') {
                        this.isAdmin = true;
                    }

                }
            } catch (e) {
                console.log(e);
                if (e.response.status === 401) {

                } else if (e.response.status === 404) {
                    router.push('/badsession');
                }
            }

        },
        async getUsers() {
            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`, // Agrega el token JWT a los encabezados de la solicitud
                }

            };

            try {
                if (this.user.role === 'ADMIN') {

                    const response = await axios.get('http://localhost:8080/users/', config);

                    this.users = response.data;

                }


            } catch (error) {
                // Manejo de errores
                console.error(error);
            }
        }
    },
    components: {
        SingOutBut
    }
}
</script>