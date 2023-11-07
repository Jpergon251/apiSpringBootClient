<template>
    <div class="equipo-page">
        <section class="jugadores-list">
            <h2>Jugadores</h2>
            <p></p>
            <div class="jugador" v-for="player in equipo.jugadores" :key="player.id">
                <!-- <router-link :to="{ name: 'Jugador', params: { id: player.id } }">

                </router-link> -->
            </div>
        </section>

        <section class="equipo-stats">

            <p>Victorias: {{ equipo.victorias }}</p>
            <p>Derrotas: {{ equipo.derrotas }}</p>
            <p>Oro por minuto: {{ (equipo.oro / (equipo.tiempoDeJuego / 60)).toFixed(2) }}</p>
            <p>Barones: {{ equipo.barones }}</p>
            <p>Dragones: {{ equipo.dragones }}</p>
            <p>Minions por minuto: {{ (equipo.minions / (equipo.tiempoDeJuego / 60)).toFixed(2) }}</p>
            <p>Tiempo de juego: {{ Math.floor(equipo.tiempoDeJuego / 60) }}h {{ equipo.tiempoDeJuego % 60 }}min</p>
            <p>KDA promedio: {{ kdaPromedio() }}</p>
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