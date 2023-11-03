<template>
    <header v-if="loggedIn" class="header">
        <figure class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/800px-League_of_Legends_2019_vector.svg.png"
                alt="Logo">
        </figure>
        <section class="sponsor-group">
            <span class="sponsor-thanks">Gracias por patrocinarnos</span>
            <a class="sponsor-image"></a>
        </section>

        <div class="menu-icon" @click="toggleMenu">
            <i class="fas fa-bars"></i>
        </div>
        <nav class="menu" :class="{ active: isActive }">
            <router-link to="/" class="link">Inicio</router-link>
            <router-link to="/equipos" class="link">Equipos</router-link>
            <router-link to="/partidas" class="link">Partidas</router-link>
            <router-link to="/perfil" class="link">Perfil</router-link>
        </nav>
    </header>
</template>

<script>
import store from '@/store/store';


export default {
    name: 'Header',
    data() {
        return {
            loggedIn: store.state.loggedIn,
            isActive: true,
        };
    },
    methods: {
        toggleMenu() {
            this.isActive = !this.isActive;
        },
    },
};
</script>