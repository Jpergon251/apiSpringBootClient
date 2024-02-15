<template>
  <main class="profile-container">
    <h1 class="profile-title">PERFIL</h1>

    <section class="user-info">
      <section class="user-card">
        <section class="titles-section">
          <h2 class="user-title">Rol:</h2>
          <h2 class="user-title">Nombre de usuario:</h2>
          <h2 class="user-title">Email:</h2>
        </section>
        <section class="entries-section" v-if="editingUserId !== myUser.id">
          <p class="user-entry" :class="myUser.role">{{ myUser.role }}</p>
          <p class="user-entry">{{ myUser.username }}</p>
          <p class="user-entry">{{ myUser.email }}</p>
        </section>
        <form
          class="entries-section"
          @submit.prevent="saveEditedUser(myUser)"
          v-if="editingUserId === myUser.id"
        >
          <p class="user-entry" :class="myUser.role">{{ myUser.role }}</p>
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          <input
            type="text"
            class="user-entry"
            v-model="editedUsername"
            :placeholder="myUser.username"
          />
          <input
            type="text"
            class="user-entry"
            v-model="editedEmail"
            :placeholder="myUser.email"
          />

          <section class="buttons-section">
            <button type="submit">Guardar</button>
            <button @click="cancelEditUser()">Cancelar</button>
          </section>
        </form>
        <section class="buttons-section">
          <SingOutBut class="singout-but" />
          <button class="edit-but" @click="toggleEditUser()">
            <i class="fas fa-pen"> </i>
          </button>
        </section>
      </section>
    </section>

    <section class="players-section">
      <h2 class="players-title">Jugadores favoritos</h2>
      <ul class="players-fav-list" v-if="myUser.jugadoresFavoritos.length > 0">
        <li></li>
      </ul>
      <p class="no-players" v-else>No hay jugadores favoritos</p>
    </section>

    <section class="users">
      <button
        class="hide-but"
        v-if="isAdmin"
        @click="getUsers(), (isShowed = !isShowed)"
      >
        {{
          isShowed ? "Ocultar lista de usuarios" : "Mostrar lista de usuarios"
        }}
      </button>
      <ul class="users-list" v-if="isShowed">
        <section class="title-section">
          <h3 class="users-title">Usuarios</h3>
          <div class="search-bar">
            <i class="fas fa-search"></i
            ><input
              type="text"
              v-model="searchQuery"
              @input="searchUsers"
              placeholder="Ingrese el nombre"
            />
          </div>
        </section>
        <li class="user-card" v-for="user in filteredUsers" :key="user.id">
          <UserCard
            :user="user"
            :myUser="myUser"
            :configToken="configToken"
            :users="users"
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import axios from "axios";
import SingOutBut from "../components/SingOutBut.vue";
import store from "@/store/store";
import router from "@/router/router";
export default {
  data() {
    return {
      myUser: {},
      isAdmin: false,
      users: [],
      isShowed: false,
      editingUserId: null,
      roles: ["ADMIN", "USER"], // Lista de roles disponibles
      configToken: {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      },
      editedUsername: "",
      editedEmail: "",
      errorMessage: "",
      searchQuery: "", // propiedad para almacenar la consulta de búsqueda

      filteredUsers: [],
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    searchUsers() {
      // Si no hay consulta de búsqueda, muestra todos los usuarios originales
      if (this.searchQuery === "") {
        this.filteredUsers = this.users;
      } else {
        // Filtra usuarios cuyos nombres comienzan con la búsqueda en tiempo real
        this.filteredUsers = this.users.filter((user) =>
          user.username.toLowerCase().startsWith(this.searchQuery.toLowerCase())
        );
      }
    },
    toggleEditUser() {
      this.editingUserId =
        this.editingUserId === this.myUser.id ? null : this.myUser.id;
    },
    cancelEditUser() {
      this.editingUserId = null;
    },
    async saveEditedUser(user) {
      try {
        const changes = {};

        if (this.editedUsername !== "") {
          changes.username = this.editedUsername;
        }
        if (this.editedEmail !== "") {
          changes.email = this.editedEmail;
        }

        const response = await axios.put(
          "http://localhost:8080/users/" + user.id,
          changes,
          this.configToken
        );
        console.log(response);

        if (response.status == 200) {
          this.editingUserId = null;
          Object.assign(user, changes);
          console.log(response);
        } else if (response.status == 500) {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        if (error.response.status === 500) {
          console.log(error);
          this.errorMessage = "Nombre de usuario o email ya en uso";
        }
      }
    },
    async loadUser() {
      const config = {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      };
      try {
        const response = await axios.get(
          "http://localhost:8080/users/dto/" + store.state.sessionData.id,
          config
        );
        if (response.status == 200) {
          this.myUser = response.data;
          if (this.myUser.role == "ADMIN") {
            this.isAdmin = true;
          } else if (this.myUser.role == "BANNED") {
            router.push("/blocked");
          }
        }
      } catch (e) {
        console.log(e);
        if (e.code === "ERR_NETWORK") {
          router.push("/badsession");
        }
      }
    },
    async getUsers() {
      try {
        if (this.myUser.role === "ADMIN") {
          const response = await axios.get(
            "http://localhost:8080/users/",
            this.configToken
          );

          this.users = response.data;
          this.filteredUsers = this.users;
        }
      } catch (error) {
        // Manejo de errores
        console.error(error);
      }
    },
  },
  components: {
    UserCard,
    SingOutBut,
  },
};
</script>
