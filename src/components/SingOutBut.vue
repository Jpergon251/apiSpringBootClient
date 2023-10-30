<template>
    <button @click="logout" v-if="isLoggedIn">Cerrar Sesión</button>
</template>

<script>
import store from '@/store/store';

export default {
    data() {
        return {
            isLoggedIn: this.$store.getters.isLoggedIn, // Define la propiedad aquí
        };
    },
    methods: {
        logout() {
            this.$store.commit('logout'); // Llama a la mutación 'logout' del store
            window.location.reload(); // Recarga la página
        },
    },
};
</script>