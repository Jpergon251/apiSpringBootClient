<template>
    <div class="equipo-page">
        <section class="equipo-info">
            <h1>{{ equipo.nombre }}</h1>
            <p>Entrenador: {{ equipo.coach }}</p>
            <p>Nick del Entrenador: {{ equipo.nickCoach }}</p>
            <p>Victorias: {{ equipo.victorias }}</p>
            <p>Derrotas: {{ equipo.derrotas }}</p>
            <p>Oro por minuto: {{ equipo.oro / (equipo.tiempoDeJuego / 60) }}</p>
            <p>Barones: {{ equipo.barones }}</p>
            <p>Dragones: {{ equipo.dragones }}</p>
            <p>Minions por minuto: {{ equipo.minions / (equipo.tiempoDeJuego / 60) }}</p>
            <p>Tiempo de juego: {{ equipo.tiempoDeJuego }}</p>
            <p>KDA: {{ kdaPromedio }}</p>
        </section>

        <section class="jugadores-list">
            <h2>Jugadores</h2>
            <div class="jugador" v-for="player in equipo.jugadores" :key="player.id">
                <div class="jugador-info">
                    <h3>{{ player.nick }}</h3>
                    <p>Nombre: {{ player.nombre }}</p>
                    <p>Posición: {{ player.posicion }}</p>
                    <p>Edad: {{ player.edad }}</p>
                    <p>Nacionalidad: {{ player.nacionalidad }}</p>
                    <p>Campeón Favorito: {{ player.campeonFavorito || 'No especificado' }}</p>
                    <p>Bajas: {{ player.bajas }}</p>
                    <p>Muertes: {{ player.muertes }}</p>
                    <p>Asistencias: {{ player.asistencias }}</p>
                    <p>KDA: {{ (player.bajas + player.asistencias) / player.muertes }}</p>
                </div>
                <div class="jugador-foto">
                    <img :src="player.foto" alt="Foto del jugador" />
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import store from '@/store/store';
import axios from 'axios';
export default {
    data() {
        return {
            equipo: {

            }
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
    },
    computed: {
        kdaPromedio() {
            if (this.equipo.jugadores.length === 0) {
                return 0; // No hay jugadores
            }

            let totalKDA = 0;

            this.equipo.jugadores.forEach((player) => {
                const kda = (player.bajas + player.asistencias) / player.muertes;
                totalKDA += kda;
            });

            return (totalKDA / this.equipo.jugadores.length).toFixed(2);
        },
    },
};
</script>