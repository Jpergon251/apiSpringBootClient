<template>
    <section class="equipos-container">
        <h1 class="equipos-title">EQUIPOS</h1>
        <ul class="equipos-list">
            <router-link :to="{ name: 'Equipo', params: { id: equipo.id } }" v-for="equipo in equipos" :key="equipo.id"
                class="equipo-item">
                <img :src="equipo.logo" alt="Logo del equipo" class="equipo-logo">
                <p class="equipo-nombre">{{ equipo.nombre }}</p>
            </router-link>
        </ul>
    </section>
</template>

<script>
import store from '@/store/store';
import axios from 'axios';
export default {

    data() {
        return {
            equipos: [],
        }
    },
    created() {
        this.getTeams();
    },
    methods: {
        async getTeams() {
            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`,
                }
            }
            const response = await axios.get('http://localhost:8080/equipos/', config);
            console.log(response.data);
            this.equipos = response.data
        }
    }
}
</script>
