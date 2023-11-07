<template>
    <div class="equipo-page">
        <section class="equipo-info">
            <h2 class="equipo-title">Info</h2>
        </section>
        <section class="equipo-jugadores">
            <h2 class="equipo-title">Jugadores</h2>
        </section>

        <section class="equipo-stats">
            <h2 class="equipo-title">Estadisticas</h2>
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