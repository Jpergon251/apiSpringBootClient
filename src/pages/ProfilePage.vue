<template>
    <main class="profile-container">
        <h1 class="profile-title">PERFIL</h1>

        <section class="user-info">

            <section class="user-card">
                <section class="titles-section">
                    <h2 class="user-title">Rol: </h2>
                    <h2 class="user-title">Nombre de usuario: </h2>
                    <h2 class="user-title">Email: </h2>
                </section>
                <section class="entries-section">
                    <p class="user-entry" :class="myUser.role">{{ myUser.role }}</p>
                    <p class="user-entry">{{ myUser.username }}</p>
                    <p class="user-entry">{{ myUser.email }}</p>
                </section>
                <SingOutBut class="singout-but" />

            </section>

        </section>

        <section class="players-section">
            <h2 class="players-title">JUGADORES</h2>
            <p>{{ myUser.jugadoresFavoritos }}</p>
        </section>
        <section class="users">
            <button class="hide-but" v-if="isAdmin" @click="getUsers(), isShowed = !isShowed">
                {{ isShowed ? 'Ocultar lista de usuarios' : 'Mostrar lista de usuarios' }}
            </button>
            <ul class="users-list" v-if="isShowed">
                <h3 class="users-title">Usuarios</h3>
                <li class="user-card" v-for="user in users" :key="user.id">
                    <section class="user-data">
                        <h3 class="username">{{ user.username }}</h3>
                        <p class="email">{{ user.email }}</p>
                        <p class="role">{{ user.role }}</p>
                    </section>
                    <section class="users-buttons">
                        <button class="edit-but">Editar<i class="fas fa-pen"></i></button>
                        <button class="block-but">Bloquear<i class="fas fa-ban "></i></button>
                        <button class="unblock-but">Desbloquear <i class="fas fa-lock-open"></i></button>
                        <button class="delete-but">Eliminar <i class="fas fa-xmark"></i></button>
                    </section>
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
import axios from 'axios'
import SingOutBut from '../components/SingOutBut.vue'
import store from '@/store/store';
import router from '@/router/router';
export default {
    data() {
        return {
            myUser: {

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
                    this.myUser = response.data;
                    if (this.myUser.role == 'ADMIN') {
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
                if (this.myUser.role === 'ADMIN') {

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