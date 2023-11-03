<template>
    <button @click="logout" v-if="isLoggedIn">Cerrar Sesión</button>
</template>

<script>
import store from '@/store/store';
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            isLoggedIn: store.state.loggedIn, // Define la propiedad aquí
        };
    },
    methods: {
        logout() {
            Cookies.remove('session');
            window.location.reload(); // Recarga la página
        },
    },
};
</script>