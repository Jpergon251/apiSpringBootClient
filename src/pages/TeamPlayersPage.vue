<template>
    <main class="equipo-page">

        <h1 class="equipo-main-title">{{ equipo.nombre }}</h1>
        <section class="equipo-info">
            <h2 class="equipo-title">Info</h2>
            <p class="equipo-description">{{ equipo.descripcion }}</p>

            <section class="coach-section">
                <h2 class="equipo-title">Entrenador</h2>
                <section class="coach-card">
                    <figure class="coach-foto">
                        <img class="coach-image" :src="equipo.coachFoto" alt="Imagen de coach">
                    </figure>
                    <section class="coach-info">
                        <h3 class="coach-name">{{ equipo.coach }}</h3>
                        <p class="coach-position">{{ equipo.nickCoach }}</p>
                    </section>
                </section>
            </section>
        </section>
        <section class="equipo-jugadores">
            <h2 class="equipo-title">Jugadores</h2>
            <section class="jugador-card" v-for="jugador in equipo.jugadores" :key="jugador.id">
                <section class="jugador-profile">
                    <figure class="jugador-foto">
                        <img class="jugador-image" :src="jugador.foto" alt="Imagen de jugador">
                    </figure>
                    <section class="jugador-info">
                        <h3 class="jugador-name">{{ jugador.nombre }}</h3>
                        <p class="jugador-position">{{ jugador.posicion }}</p>
                        <p class="jugador-nacionalidad">{{ jugador.nacionalidad }}</p>
                    </section>
                </section>
            </section>

            <section class="equipo-stats">
                <h2 class="equipo-title">Estadisticas</h2>
            </section>
        </section>

    </main>
</template>
  
<script>
import store from '@/store/store';
import axios from 'axios';
export default {
    data() {
        return {
            equipo: {

            },
        };
    },
    created() {
        this.getPlayers();
    },
    methods: {
        async getPlayers() {
            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`,
                }
            }
            try {
                const response = await axios.get(`http://localhost:8080/equipos/${this.$route.params.id}/`, config);
                if (response.status === 200) {
                    this.equipo = response.data
                    console.log(this.equipo)
                }
            } catch (error) {
                console.error(error);
            }
        },

        kdaPromedio() {
            const jugadores = this.equipo.jugadores
            var totalKDA = 0

            for (const jugador of jugadores) {
                totalKDA += jugador.kda
                console.log(totalKDA)
            }

            return (totalKDA / jugadores.length).toFixed(2)

        }
    },
};
</script>