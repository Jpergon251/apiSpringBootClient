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
                <li class="user-card" v-for="user in  users " :key="user.id">
                    <section class="user">
                        <section v-if="!editingUserId || editingUserId !== user.id" class="user-data">
                            <h3 class="username">{{ user.username }}</h3>
                            <p class="email">{{ user.email }}</p>
                            <p class="role">{{ user.role }}</p>
                        </section>

                        <form @submit.prevent="saveEditedUser(user)" v-if="editingUserId === user.id"
                            class="user-data editing">
                            <input v-model="editedUsername" class="username" :placeholder="user.username" />

                            <input v-model="editedEmail" class="email" :placeholder="user.email" />

                            <select class="select-role role" v-model="role" required>
                                <option value="" disabled="disabled" selected>{{ user.role }}</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                            <section class="edit-buttons">
                                <button class="save-but" @click="saveEditedUser(user)">Guardar Cambios</button>
                                <button class="cancel-but" @click="cancelEditUser(user)">Cancelar</button>
                            </section>

                        </form>
                        <label for="editedUsername"></label>
                        <section class="users-buttons" v-if="user.username !== myUser.username">
                            <button class="edit-but" @click="toggleEditUser(user)"> <i class="fas fa-pen"></i></button>
                            <button class="block-but" @click="blockUser(user)" :disabled="user.role === 'ADMIN'">
                                <i class="fas fa-ban "></i>
                            </button>
                            <button class="unblock-but" @click="unblockUser(user)" :disabled="user.role === 'ADMIN'">
                                <i class="fas fa-lock-open"></i>
                            </button>
                            <button class="delete-but" @click="deleteUser(user)"><i class="fas fa-xmark"></i></button>
                        </section>
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
            isShowed: false,
            editingUserId: null,
            roles: ['ADMIN', 'USER'], // Lista de roles disponibles
            configToken: {
                headers: {
                    Authorization: `Bearer ${store.state.token}`
                }
            },
            editedUsername: '',
            editedEmail: '',
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


            try {
                if (this.myUser.role === 'ADMIN') {

                    const response = await axios.get('http://localhost:8080/users/', this.configToken);

                    this.users = response.data;

                }


            } catch (error) {
                // Manejo de errores
                console.error(error);
            }
        },
        toggleEditUser(user) {
            // Activa/desactiva el modo de edición para el usuario específico
            this.editingUserId = this.editingUserId === user.id ? null : user.id;
            // Puedes inicializar las propiedades editedUsername y editedEmail aquí si es necesario
        },
        cancelEditUser(user) {
            // Cancela el modo de edición
            this.editingUserId = null;
            // Puedes reiniciar las propiedades editedUsername y editedEmail aquí si es necesario
        },
        async saveEditedUser(user) {
            // Lógica para guardar los cambios en el usuario
            // Puedes realizar una solicitud HTTP PUT al backend aquí
            console.log('Guardar cambios para el usuario con ID:', user.id);
            console.log('Nuevo nombre de usuario:', user.editedUsername);
            console.log('Nuevo correo electrónico:', user.editedEmail);
            this.editingUserId = null;



            // const edition = await axios.put('http://localhost:8080/users/' + user.id, this.configToken);

        },
        blockUser(user) {
            console.log('Blocking user', user.username);
            user.role = 'BANNED';
        },
        unblockUser(user) {
            console.log('Unblocking user', user.username);
            user.role = 'USER';
        },
        async deleteUser(user) {
            console.log('Deleting user', user.username);
            this.users.splice(user.id);
            try {
                const deleteUser = await axios.delete('http://localhost:8080/users/' + user.id, this.configToken);
            } catch (error) {

            }

        },
    },
    components: {
        SingOutBut
    }
}
</script>