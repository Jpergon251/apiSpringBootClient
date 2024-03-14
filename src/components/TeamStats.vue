<!-- Tarta 2 -->
<template>
  <h1 class="team-stats-title">Estadísticas del equipo</h1>

  <section class="team-stats-container" v-if="equipoLoaded">
    <section class="pie-chart">
      <p class="victories">
        {{ this.equipo.victorias + " Victorias" }}
      </p>
      <canvas
        class="canvas pieChart"
        ref="pieChart"
        width="300"
        height="300"
      ></canvas>
      <p class="defeats">
        {{ this.equipo.derrotas + " Derrotas" }}
      </p>
    </section>
    <section class="bar-chart">
      <h3>Tiempo de juego: {{ formatTime(this.equipo.tiempoDeJuego) }}</h3>
      <div class="data-container">
        <!-- Winrate -->
        <h4>
          Winrate:
          {{
            (
              this.equipo.victorias /
              (this.equipo.victorias + this.equipo.derrotas)
            ).toFixed(2) *
              100 +
            "%"
          }}
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{
                width:
                  (this.equipo.victorias /
                    (this.equipo.victorias + this.equipo.derrotas)) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
        </h4>
        <!-- Dragones -->
        <h4>
          Dragones: {{ this.equipo.dragones }}
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{
                width:
                  (this.equipo.dragones /
                    (5 * (this.equipo.victorias + this.equipo.derrotas))) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
        </h4>
        <!-- Minions -->
        <h4>
          Minions: {{ this.equipo.minions }}
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{
                width:
                  (this.equipo.minions /
                    (3000 * (this.equipo.victorias + this.equipo.derrotas))) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
        </h4>
        <!-- Torres -->
        <h4>
          Torres: {{ this.equipo.torres }}
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{
                width:
                  (this.equipo.torres /
                    (11 * (this.equipo.victorias + this.equipo.derrotas))) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
        </h4>
        <!-- Barones -->
        <h4>
          Barones: {{ this.equipo.barones }}
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{
                width:
                  (this.equipo.barones /
                    (2 * (this.equipo.victorias + this.equipo.derrotas))) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
        </h4>
      </div>
    </section>
  </section>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: {
    equipo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      equipoLoaded: false,

      winrate:
        (this.equipo.victorias /
          (this.equipo.victorias + this.equipo.derrotas)) *
        100,
      totalDragonesEstimados:
        5 * (this.equipo.victorias + this.equipo.derrotas),
      totalMinionsEstimados:
        3000 * (this.equipo.victorias + this.equipo.derrotas),
      totalTorresEstimadas: 11 * (this.equipo.victorias + this.equipo.derrotas),
      totalOroEstimado: 70000 * (this.equipo.victorias + this.equipo.derrotas),
      totalBaronesEstimados: 2 * (this.equipo.victorias + this.equipo.derrotas),
    };
  },
  watch: {
    // Observador para los cambios en los datos del equipo
    equipo: {
      handler: "renderPieChart", // Llama a la función cuando hay cambios
      deep: true, // Observa cambios en propiedades anidadas
    },
  },

  mounted() {
    // Renderiza el gráfico solo si hay datos disponibles
    if (this.equipo) {
      this.equipoLoaded = true;

      this.$nextTick(() => {
        this.renderPieChart();
      });
    }
  },
  methods: {
    renderPieChart() {
      // Obtén el contexto del canvas
      const ctx = this.$refs.pieChart.getContext("2d");

      // Destruye el gráfico anterior si existe
      if (this.pieChart) {
        this.pieChart.destroy();
      }

      // Extrae datos para el gráfico de pastel
      const data = {
        labels: ["Victorias", "Derrotas"],
        datasets: [
          {
            data: [this.equipo.victorias, this.equipo.derrotas],
            backgroundColor: ["#FF2A4F", "#2e2333"],
            hoverBackgroundColor: ["#ff718a", "#503d59"],
          },
        ],
      };

      // Configuración del gráfico de pastel
      const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Oculta la leyenda predeterminada
          },
          labels: {
            render: "value",
            fontColor: ["#ffffff", "#ffffff"],
          },
        },
      };

      // Crea el gráfico de pastel y guárdalo en una variable para poder destruirlo más tarde
      this.pieChart = new Chart(ctx, {
        type: "pie",
        data: data,
        options: options,
      });
    },

    formatTime(time) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;

      return `${hours}h ${minutes} min ${seconds} seg`;
    },
  },
};
</script>
