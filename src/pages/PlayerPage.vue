<template>
    <section class="player-info">
        <h2>{{ player.nick }}</h2>
        <p class="player-name">Nombre: {{ player.nombre }}</p>
        <p class="player-position">Posición: {{ player.posicion }}</p>
        <p class="player-age">Edad: {{ player.edad }}</p>
        <p class="player-nationality">Nacionalidad: {{ player.nacionalidad }}</p>
        <p class="player-favorite-champion">Campeón Favorito: {{ player.campeonFavorito }}</p>
        <p class="player-kda">KDA: {{ player.kda }}</p>
        <img class="player-photo" :src="player.foto" alt="Foto del jugador" />
        <p class="player-team">Equipo: {{ player.equipo }}</p>
    </section>
</template>

<script>
import axios from 'axios';
import store from '@/store/store';
export default {
    data() {
        return {
            player: {

            }
        }
    },
    created() {
        this.getPlayer();
    },
    methods: {
        async getPlayer() {

            const config = {
                headers: {
                    Authorization: `Bearer ${store.state.token}`,
                }
            }

            try {

                const response = await axios.get(`http://localhost:8080/jugadores/dto/${this.$route.params.id}/`, config);
                if (response.status === 200) {
                    this.player = response.data
                    console.log(this.player)
                }

            } catch (error) {

            }
        }
    }
}
</script>

