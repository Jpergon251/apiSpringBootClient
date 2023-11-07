<template>
    <ul class="partidas-list">
        <li class="partida" v-for="partida in partidas" :key="partida.id">
            <section class="equipos-partida">
                <section class="equipo-container">
                    <figure class="equipo-logo">
                        <img class="equipo-logo-imagen" src="#" alt="Logo equipo">
                    </figure>
                    <h2 class="equipo-nombre">{{ partida.equipoLocal.nombre }}</h2>
                    <p class="equipo-ganador">{{ partida.equipoGanador === partida.equipoLocal.nombre ? 'Victoria' :
                        'Derrota' }}</p>
                </section>
                <span class="versus">VS</span>
                <section class="equipo-container">
                    <figure class="equipo-logo">
                        <img class="equipo-logo-imagen" src="#" alt="Logo equipo">
                    </figure>
                    <h2 class="equipo-nombre">{{ partida.equipoVisitante.nombre }}</h2>
                    <p class="equipo-ganador">{{ partida.equipoGanador === partida.equipoVisitante.nombre ? 'Victoria' :
                        'Derrota' }}
                    </p>
                </section>
            </section>
            <span class="fecha-partida">{{ partida.fecha }}</span>
        </li>
    </ul>
</template>

<script>
import store from '@/store/store';
import axios from 'axios'
export default {
    data() {
        return {
            partidas: [],
        }
    },
    created() {
        this.getMatches();
    },

    methods: {
        async getMatches() {

            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`,
                }
            }
            try {
                const response = await axios.get('http://localhost:8080/partidas/', config);
                console.log(response.data);

                if (response.status === 200) {
                    this.partidas = response.data
                }
            } catch (error) {

            }
        },
    }

}
</script>
