<template>
  <main class="partida-page">
    <section class="title">
      {{ partida.equipoLocal.nombre + " VS " + partida.equipoVisitante.nombre }}
    </section>

    <section class="partida-card">
      <section class="partida-data">
        <h1>Fecha: {{ formatFecha(partida.fecha) }}</h1>
        <h1>Duracion de la partida: {{ formatDuracion(partida.duracion) }}</h1>
      </section>
      <section class="equipos">
        <div class="equipo">
          <img class="equipo-logo" :src="partida.equipoLocal.logo" />

          <h2 class="equipo-nombre">{{ partida.equipoLocal.nombre }}</h2>
          <ul class="jugadores">
            <li
              class="jugador"
              v-for="jugador in partida.equipoLocal.jugadores"
            >
              <router-link class="link" :to=" { name: 'Jugador', params: { id: jugador.id } }"> <h1>{{ jugador.nick }}</h1></router-link>
              <img :src="jugador.foto" />
            </li>
          </ul>
          <h3 :class="'estado ' + estadoVictoria(partida.equipoLocal.nombre)">
            {{ estadoVictoria(partida.equipoLocal.nombre) }}
          </h3>
        </div>
        <div class="equipo">
          <img class="equipo-logo" :src="partida.equipoVisitante.logo" />

          <h2 class="equipo-nombre">{{ partida.equipoVisitante.nombre }}</h2>
          <ul class="jugadores">
            <li
              class="jugador"
              v-for="jugador in partida.equipoVisitante.jugadores"
            >
              <router-link class="link" :to=" { name: 'Jugador', params: { id: jugador.id } }"> <h1>{{ jugador.nick }}</h1></router-link>
              <img :src="jugador.foto" />
            </li>
          </ul>
          <h3
            :class="'estado ' + estadoVictoria(partida.equipoVisitante.nombre)"
          >
            {{ estadoVictoria(partida.equipoVisitante.nombre) }}
          </h3>
        </div>
      </section>
      <section class="estadisticas">
        <div class="data">
          <p>Torres: {{ partida.torresLocal }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.torresLocal / torresEstimadas) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>Barones: {{ partida.baronesLocal }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.baronesLocal / baronesEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>Dragones: {{ partida.dragonesLocal }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.dragonesLocal / dragonesEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>
            Minions/min:
            {{
              (partida.minionsLocal / (partida.duracion / 60)).toFixed(1)
            }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.minionsLocal / minionsEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          
          <p>
            Oro/min:
            {{ (partida.oroLocal / (partida.duracion / 60)).toFixed(1) }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.oroLocal / oroEstimado) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          
        </div>
        <div class="data">
          <p>Torres: {{ partida.torresVisitante }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.torresVisitante / torresEstimadas) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>Barones: {{ partida.baronesVisitante }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.baronesVisitante / baronesEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>Dragones: {{ partida.dragonesVisitante }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.dragonesVisitante / dragonesEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          <p>
            Minions/min:
            {{
              (partida.minionsVisitante / (partida.duracion / 60)).toFixed(1)
            }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.minionsVisitante / minionsEstimados) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          
          <p>
            Oro/min:
            {{ (partida.oroVisitante / (partida.duracion / 60)).toFixed(1) }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{
                  width: (partida.oroVisitante / oroEstimado) * 100 + '%',
                }"
              ></div>
            </div>
          </p>
          
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import store from "@/store/store";
import axios from "axios";
export default {
  name: "MatchPage",
  data() {
    return {
      partida: [],
      estadoPartida: false,
      oroEstimado: 70000,
      baronesEstimados: 2,
      torresEstimadas: 11,
      dragonesEstimados: 5,
      minionsEstimados: 3000,
    };
  },
  created() {
    this.getMatch();
  },
  methods: {
    async getMatch() {
      const config = {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      };
      try {
        const response = await axios.get(
          "https://apispringbootserver.up.railway.app/partidas/" + this.$route.params.id + "/",
          config
        );
        if (response.status === 200) {
          this.partida = response.data;
        }
      } catch (error) {
        // console.error(error);
      }
    },
    formatDuracion(duracion) {
      const minutos = Math.floor(duracion / 60);
      const segundos = duracion % 60;

      // Puedes ajustar el formato según tus preferencias
      return `${minutos} min ${segundos} seg`;
    },
    formatFecha(fecha) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      // Convierte la fecha a una cadena en el formato deseado
      return new Date(fecha).toLocaleDateString("es-ES", options);
    },
    estadoVictoria(equipo) {
      return equipo === this.partida.equipoGanador ? "Victoria" : "Derrota";
    },
  },
};
</script>
