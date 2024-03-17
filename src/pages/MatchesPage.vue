<template>
  <main class="partidas-container">
    <h1 class="partidas-title">PARTIDAS</h1>

    <section class="search-filters">
      <section class="search-filter">
        <label for="localTeam">Equipo Local:</label>
        <label for="visitorTeam">Equipo Visitante:</label>
        <input
          type="text"
          id="localTeam"
          v-model="localTeamSearch"
          @input="applyFilters"
        />
        <input
          type="text"
          id="visitorTeam"
          v-model="visitorTeamSearch"
          @input="applyFilters"
        />
      </section>

      <section class="search-filter">
        <label for="startDate">Fecha de inicio:</label>
        <label for="endDate">Fecha de fin:</label>
        <input
          type="date"
          id="startDate"
          v-model="startDate"
          @input="applyFilters"
        />
        <input
          type="date"
          id="endDate"
          v-model="endDate"
          @input="applyFilters"
        />
      </section>
    </section>

    <section class="partidas-list-container">
      <ul class="partidas-list">
        <li
          class="partida"
          v-for="(partida, index) in filteredPartidas.slice(0, visiblePartidas)"
          :key="partida.id"
        >
          <MatchCard :partida="partida" />
        </li>
      </ul>

      <p class="no-matches" v-if="filteredPartidas.length === 0">
        No hay partidas disponibles
      </p>
    </section>

    <section class="load-more-container">
      <button
        class="load-more-button"
        @click="cargarMas"
        v-if="visiblePartidas < filteredPartidas.length"
      >
        Cargar más partidas
      </button>
    </section>
  </main>
</template>

<script>
import MatchCard from "@/components/MatchCard.vue";
import store from "@/store/store";
import axios from "axios";
export default {
  data() {
    return {
      partidas: [],
      filteredPartidas: [],
      localTeamSearch: "",
      visitorTeamSearch: "",
      startDate: "",
      endDate: "",
      visiblePartidas: 10, // Cambia el número inicial de partidas visibles
      partidasPorCargar: 5, // Cambia el número de partidas a cargar cada vez
    };
  },
  created() {
    this.getMatches();
  },

  methods: {
    async getMatches() {
      const config = {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      };
      try {
        const response = await axios.get(
          "https://apispringbootserver.up.railway.app/partidas/",
          config
        );
        console.log(response.data);

        if (response.status === 200) {
          // Ordenar las partidas por fecha en orden ascendente
          this.partidas = response.data.sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
          );

          this.filteredPartidas = this.partidas;
        }
      } catch (error) {
        console.error(error);
      }
    },
    applyFilters() {
      // Aplicar los filtros
      this.filteredPartidas = this.partidas.filter(
        (partida) =>
          partida.equipoLocal.nombre
            .toLowerCase()
            .startsWith(this.localTeamSearch.toLowerCase()) &&
          partida.equipoVisitante.nombre
            .toLowerCase()
            .startsWith(this.visitorTeamSearch.toLowerCase()) &&
          this.filterByFecha(partida)
      );
      if (
        this.localTeamSearch === "" &&
        this.visitorTeamSearch === "" &&
        this.startDate === "" &&
        this.endDate === ""
      ) {
        this.filteredPartidas = this.partidas;
      }
    },
    filterByFecha(partida) {
      if (this.startDate !== "" && this.endDate !== "") {
        return partida.fecha >= this.startDate && partida.fecha <= this.endDate;
      } else if (this.startDate === "" && this.endDate !== "") {
        return partida.fecha <= this.endDate;
      } else if (this.startDate !== "" && this.endDate === "") {
        return partida.fecha >= this.startDate;
      }
      return true;
    },
    cargarMas() {
      this.visiblePartidas += this.partidasPorCargar;
    },
  },
  components: {
    MatchCard,
  },
};
</script>
