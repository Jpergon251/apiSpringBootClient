<template>
  <main class="one-player-page">
    <section class="one-player-title">JUGADOR</section>
    <section class="one-player-card">
      <img :src="player.foto" alt="Foto del jugador" />
      <section class="one-player-data">
        <h2>{{ player.nick }}</h2>
        <p class="one-player-name">Nombre: {{ player.nombre }}</p>
        <p class="one-player-position">Posición: {{ player.posicion }}</p>
        <p class="one-player-age">Edad: {{ player.edad }}</p>
        <p class="one-player-nationality">
          Nacionalidad: {{ player.nacionalidad }}
        </p>
        <p class="one-player-favorite-champion">
          Campeón Favorito: {{ player.campeonFavorito }}
        </p>
      </section>
      <section class="one-player-stats">
        <p class="one-player-kills">Bajas: {{ player.bajas }}</p>
        <p class="one-player-deaths">Muertes: {{ player.muertes }}</p>
        <p class="one-player-assists">Asistencias: {{ player.asistencias }}</p>
        <p class="one-player-kda">BMA: {{ player.kda }}</p>
      </section>
      <!-- <h2>{{ player.nick }}</h2>
      <p class="player-name">Nombre: {{ player.nombre }}</p>
      <p class="player-position">Posición: {{ player.posicion }}</p>
      <p class="player-age">Edad: {{ player.edad }}</p>
      <p class="player-nationality">Nacionalidad: {{ player.nacionalidad }}</p>
      <p class="player-favorite-champion">
        Campeón Favorito: {{ player.campeonFavorito }}
      </p>
      <p class="player-kda">KDA: {{ player.kda }}</p>
      <img class="player-photo" :src="player.foto" alt="Foto del jugador" />
      <p class="player-team">Equipo: {{ player.equipo }}</p> -->
    </section>
  </main>
</template>

<script>
import axios from "axios";
import store from "@/store/store";
export default {
  data() {
    return {
      player: {},
    };
  },
  created() {
    this.getPlayer();
  },
  methods: {
    async getPlayer() {
      const config = {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8080/jugadores/dto/${this.$route.params.id}/`,
          config
        );
        if (response.status === 200) {
          this.player = response.data;
        }
      } catch (error) {}
    },
  },
};
</script>
