<template>
  <main class="players-page">
    <section class="team-info">
      <h1 class="team-name">{{ equipo.nombre }}</h1>
      <section class="team-data">
        <p class="team-description" v-if="equipo.descripcion">
          {{ equipo.descripcion }}
        </p>
        <section class="team-coach-card">
          <img
            class="coach-img"
            :src="equipo.coachFoto"
            alt="Foto del equipo"
          />

          <h1 class="coach-name">
            {{ equipo.coach + " - " + "'" + equipo.nickCoach + "'" }}
          </h1>
        </section>
      </section>
    </section>

    <ul class="players-list">
      <li class="player" v-for="jugador in equipo.jugadores" :key="jugador.id">
        <section class="player-card">
          <section class="player-info">
            <figure class="player-img">
              <img :src="jugador.foto" alt="Foto del jugador" />
            </figure>
            <div class="player-data">
              <router-link
                :to="{ name: 'Jugador', params: { id: jugador.id } }"
              >
                <h2 class="player-nick">{{ jugador.nick }}</h2>
              </router-link>
              <p class="player-name">{{ jugador.nombre }}</p>
              <p class="player-position">{{ jugador.posicion }}</p>
            </div>

            <button @click="addToFavorites(jugador)">
              <i class="far fa-star" aria-hidden="true"></i>
            </button>
          </section>
          <section class="player-stats">
            <div class="champion-container">
              <img
                :src="getChampionImageURL(jugador.campeonFavorito)"
                alt="Imagen del Campeón Favorito"
                :onerror="setDefaultChampionImage"
              />
              <span>{{ jugador.campeonFavorito }}</span>
            </div>
            <div class="kda-container">
              <span class="kda-label"> B / M / A </span>
              <span class="kda-value">
                {{
                  jugador.bajas +
                  " / " +
                  jugador.muertes +
                  " / " +
                  jugador.asistencias
                }}
              </span>
            </div>
          </section>
          <!-- <button
            onclick="this.addToFavorites(jugador)"
            class="favorite-button"
          >
            <i class="far fa-star" aria-hidden="true"></i>
          </button> -->
        </section>
      </li>
    </ul>

    <section class="team-stats">
      <TeamStats :equipo="equipo" />
    </section>
  </main>
</template>

<script>
import store from "@/store/store";
import axios from "axios";
import TeamStats from "../components/TeamStats.vue";

export default {
  data() {
    return {
      equipo: {},
      champs: {},
      champsMapping: {
        Khazix: "Kha'Zix",
        KogMaw: "Kog'Maw",
        Malzahar: "Malzahar",
        MasterYi: "Master Yi",
        MissFortune: "Miss Fortune",
        Mordekaiser: "Mordekaiser",
        Nunu: "Nunu & Willump",
        RekSai: "Rek'Sai",
        TahmKench: "Tahm Kench",
        TwistedFate: "Twisted Fate",
        Wukong: "MonkeyKing",
      },
      jugadoresFavoritos: [],
    };
  },
  created() {
    this.getPlayers();
    this.getChampsImages();
  },
  methods: {
    async getPlayers() {
      const config = {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      };
      try {
        const response = await axios.get(
          `https://apispringbootserver.up.railway.app/equipos/${this.$route.params.id}/`,
          config
        );
        if (response.status === 200) {
          this.equipo = response.data;
          console.log(this.equipo);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getChampsImages() {
      try {
        const response = await axios.get(
          "https://ddragon.leagueoflegends.com/cdn/12.4.1/data/es_ES/champion.json"
        );
        if (response.status === 200) {
          this.champs = response.data.data;

          // Realizar una transformación para quedarse solo con el nombre y la imagen
          const simplifiedChamps = {};
          Object.keys(this.champs).forEach((championName) => {
            const championInfo = this.champs[championName];
            simplifiedChamps[championName] = {
              name: championInfo.name,
              image: `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${championInfo.image.full}`,
            };
          });

          console.log(simplifiedChamps);
        }
      } catch (error) {
        console.error(error);
      }
    },
    getChampionImageURL(championName) {
      // Verifica si championName es null o indefinido
      if (!championName) {
        return ""; // O devuelve una URL predeterminada o maneja el caso según tus necesidades
      }

      // Mapea el nombre del campeón según el mapeo
      const mappedChampionName =
        this.champsMapping[championName] || championName;

      // Elimina todas las comillas y capitaliza la primera letra de cada palabra
      const normalizedChampionName = mappedChampionName
        .replace(/'/g, "")
        .toLowerCase()
        .replace(/(^|\s)\S/g, (c) => c.toUpperCase());

      // Construye la URL completa para la imagen del campeón
      return `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${normalizedChampionName}.png`;
    },

    setDefaultChampionImage(event) {
      // Evento que se dispara si la imagen no se carga correctamente
      event.target.src =
        "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"; // Puedes poner la URL predeterminada que desees
    },
    kdaPromedio() {
      const jugadores = this.equipo.jugadores;
      var totalKDA = 0;

      for (const jugador of jugadores) {
        totalKDA += jugador.kda;
        console.log(totalKDA);
      }

      return (totalKDA / jugadores.length).toFixed(2);
    },
    async addToFavorites(jugador) {
      try {
        const response = await axios.post(
          `https://apispringbootserver.up.railway.app/users/${store.state.sessionData.id}/favorites`,
          jugador,
          {
            headers: {
              Authorization: `Bearer ${store.state.token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: {
    TeamStats,
  },
};
</script>
