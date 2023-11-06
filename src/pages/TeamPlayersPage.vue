<template>
    <div class="equipo-page">
        <section class="equipo-info">
            <h1>{{ equipo.nombre }}</h1>
            <p>Entrenador: {{ equipo.coach }}</p>
            <p>Nick del Entrenador: {{ equipo.nickCoach }}</p>
            <p>Victorias: {{ equipo.victorias }}</p>
            <p>Derrotas: {{ equipo.derrotas }}</p>
            <p>Oro por minuto: {{ (equipo.oro / (equipo.tiempoDeJuego / 60)).toFixed(2) }}</p>
            <p>Barones: {{ equipo.barones }}</p>
            <p>Dragones: {{ equipo.dragones }}</p>
            <p>Minions por minuto: {{ (equipo.minions / (equipo.tiempoDeJuego / 60)).toFixed(2) }}</p>
            <p>Tiempo de juego: {{ Math.floor(equipo.tiempoDeJuego / 60) }}h {{ equipo.tiempoDeJuego % 60 }}min</p>
            <p>KDA: {{ kdaPromedio() }}</p>
        </section>

        <section class="jugadores-list">
            <h2>Jugadores</h2>
            <p></p>
            <div class="jugador" v-for="player in equipo.jugadores" :key="player.id">
                <router-link :to="{ name: 'Jugador', params: { id: player.id } }">
                    <div class="jugador-info">

                        <p>{{ player.nick }}</p>

                        <p>Nombre: {{ player.nombre }}</p>
                        <p>Posición: {{ player.posicion }}</p>
                        <p>Nacionalidad: {{ player.nacionalidad }}</p>
                        <p>Bajas: {{ player.bajas }}</p>
                        <p>Muertes: {{ player.muertes }}</p>
                        <p>Asistencias: {{ player.asistencias }}</p>
                        <p>KDA: {{ player.kda.toFixed(2) }}</p>
                    </div>

                    <div class="jugador-foto">
                        <img :src="player.foto" alt="Foto del jugador" />
                    </div>
                </router-link>
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