<!-- Tarta 1-->

<!-- <template>
  <section class="team-stats-container">
    <h1>Estadísticas del equipo</h1>
    <section class="pie-chart">
      <CanvasJSChart class="canvas" :options="options" :styles="styleOptions" />
    </section>
  </section>
</template>

<script>
export default {
  props: {
    equipo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      options: {
        theme: "light2",
        animationEnabled: true,
        title: {
          text: "Índice de victorias",
        },
        data: [
          {
            type: "pie",
            indexLabel: "{label} (#percent%)",
            yValueFormatString: "#,##0",
            toolTipContent:
              "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
            dataPoints: [
              {
                label: "Victorias",
                y: this.equipo.victorias,
                color: "#ff0060",
              },
              { label: "Derrotas", y: this.equipo.derrotas, color: "#2e2333" },
            ],
          },
        ],
      },
      styleOptions: {
        width: "300px",
        height: "360px",
      },
    };
  },
};
</script> -->

<!-- Tarta 2 -->
<template>
  <section class="team-stats-container">
    <h1>Estadísticas del equipo</h1>
    <section class="pie-chart">
      <canvas ref="pieChart" width="400" height="400"></canvas>
    </section>
    <!-- <section class="bar-chart">
      <canvas ref="barChart" width="400" height="400"></canvas>
    </section> -->
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
        this.renderCharts();
      });
    }
  },
  methods: {
    renderCharts(h) {
      this.renderBarChart();
      this.renderPieChart();
    },

    renderPieChart() {
      const ctx = this.$refs.pieChart.getContext("2d");

      // Extrae datos para el gráfico de pastel
      const data = {
        labels: ["Victorias", "Derrotas"],
        datasets: [
          {
            data: [this.equipo.victorias, this.equipo.derrotas],
            backgroundColor: ["#ff0060", "#2e2333"],
            hoverBackgroundColor: ["#ff317f", "#503d59"],
          },
        ],
      };

      // Configuración del gráfico de pastel
      const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // Oculta la leyenda predeterminada
          },
          labels: {
            render: "value",
            fontColor: ["#ffffff", "#ffffff"],
          },
        },
      };

      // Crea el gráfico de pastel
      new Chart(ctx, {
        type: "pie",
        data: data,
        options: options,
      });
    },
    renderBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");

      const stats = {
        Oro: this.equipo.oro,
        Dragones: this.equipo.dragones,
        TiempoDeJuego: this.equipo.tiempoDeJuego,
        Torres: this.equipo.torres,
      };
      const data = {
        labels: Object.keys(stats),
        datasets: [
          {
            label: "Estadísticas Adicionales",
            data: Object.values(stats),
            backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63"],
          },
        ],
      };
      const options = {
        responsive: false,
        maintainAspectRatio: false,
      };
      new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    },
  },
};
</script>
