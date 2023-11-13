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

                        <form @submit.prevent=" saveEditedUser(user)" v-if="editingUserId === user.id"
                            class="user-data editing">
                            <p class="error-message">{{ errormessage }}</p>
                            <input v-model="this.editedUsername" class="username" :placeholder="user.username" />

                            <input v-model="this.editedEmail" class="email" :placeholder="user.email" />

                            <select class="select-role role" v-model="this.editedRole" required>
                                <option :value="user.role" disabled="disabled" selected="true">{{ user.role }}</option>
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
            editedRole: '',

            errormessage: '',
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
                    }else if (this.myUser.role == 'BANNED') {
                        router.push('/blocked');
                    }

                }
            } catch (e) {
                console.log(e);
                if (e.response.status === 401) {
                    router.push('/badsession')
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
                console.log('Nuevo nombre de usuario:', this.editedUsername);
                console.log('Nuevo correo electrónico:', this.editedEmail);
                console.log('Nuevo role', this.editedRole);

                  // Actualizar los valores en el objeto user

                

                
                  try {
                    // Crear un objeto para almacenar los cambios locales
                    const changes = {};

                    if (this.editedUsername !== ''){
                        changes.username = this.editedUsername;
                    }

                    if (this.editedEmail !== ''){
                        changes.email = this.editedEmail;    
                    }
                    
                    if (this.editedRoles !== ''){
                        changes.role = this.editedRole;
                    }

                    // Realizar la solicitud HTTP PUT al backend
                    const edition = await axios.put(`http://localhost:8080/users/${user.id}`, changes, this.configToken);


                    if (edition.status === 200){
                        console.log('Respuesta del servidor:', edition);
                        // Aplicar los cambios locales solo después de una respuesta exitosa
                        Object.assign(user, changes);

                        this.editingUserId = null;
                    }
                    
                } catch (error) {
                    // Manejar el error
                    if (error.response && error.response.status === 500) {
                        // No hacer nada en caso de error 500
                        this.errormessage = 'El nombre de usuario o el email ya están en uso'

                    } else {
                        console.error('Error al enviar la solicitud PUT:', error);
                    }
                }
                

        },
        async blockUser(user) {
            console.log('Blocking user', user.username);
            try{

                user.role = 'BANNED';

                const blockUser = await axios.put(`http://localhost:8080/users/${user.id}`,user, this.configToken)

            }catch(error) {
                console.error('Error al enviar la solicitud PUT: ' + error.message)
            }
        },
        async unblockUser(user) {
            try {
                user.role = 'USER';

                const unBlockUser = await axios.put(`http://localhost:8080/users/${user.id}`,user, this.configToken)

            } catch (error) {
                console.error('Error al debloquear', user.username)
            }
        },
        async deleteUser(user) {
            console.log('Deleting user', user.username);
            this.users.splice(user.id);
            try {
                const deleteUser = await axios.delete('http://localhost:8080/users/' + user.id, this.configToken);

                this.users.pop(user.id);

            } catch (error) {

            }

        },
    },
    components: {
        SingOutBut
    }
}
</script>