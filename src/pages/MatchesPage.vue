<template>
    <main class="partidas-container">

        <h1 class="partidas-title">PARTIDAS</h1>

        <section class="search-filters">
            <section class="search-filter">
                <label for="localTeam">Equipo Local:</label>
                <label for="visitorTeam">Equipo Visitante:</label>
                <input type="text" id="localTeam" v-model="localTeamSearch" @input="applyFilters">
                <input type="text" id="visitorTeam" v-model="visitorTeamSearch" @input="applyFilters">
            </section>

            <section class="search-filter">
                <label for="startDate">Fecha de inicio:</label>
                <label for="endDate">Fecha de fin:</label>
                <input type="date" id="startDate" v-model="startDate" @input="applyFilters">
                <input type="date" id="endDate" v-model="endDate" @input="applyFilters">
            </section>
        </section>


        <section class="partidas-list-container">
            <ul class="partidas-list">

                <li class="partida" v-for="partida in filteredPartidas" :key="partida.id">
                    <MatchCard :partida="partida" />
                </li>

            </ul>
        </section>

    </main>
</template>

<script>
import MatchCard from '@/components/MatchCard.vue';
import store from '@/store/store';
import axios from 'axios'
export default {
    data() {
        return {
            partidas: [],
            filteredPartidas: [],
            localTeamSearch: '',
            visitorTeamSearch: '',
            startDate: '',
            endDate: '',
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
                    this.filteredPartidas = this.partidas
                }
            } catch (error) {
                console.error(error);
            }
        },
        applyFilters() {
            // Aplicar los filtros
            this.filteredPartidas = this.partidas.filter(partida =>
                partida.equipoLocal.nombre.toLowerCase().startsWith(this.localTeamSearch.toLowerCase()) &&
                partida.equipoVisitante.nombre.toLowerCase().startsWith(this.visitorTeamSearch.toLowerCase()) &&
                this.filterByFecha(partida)
            );
            if (this.localTeamSearch === '' && this.visitorTeamSearch === '' && this.startDate === '' && this.endDate === '') {
                this.filteredPartidas = this.partidas
            }
        },
        filterByFecha(partida) {
            if (this.startDate !== '' && this.endDate !== '') {
                return partida.fecha >= this.startDate && partida.fecha <= this.endDate
            } else if (this.startDate === '' && this.endDate !== '') {
                return partida.fecha <= this.endDate
            } else if (this.startDate !== '' && this.endDate === '') {
                return partida.fecha >= this.startDate
            }
            return true
        }
    },
    components: {
        MatchCard
    }

}
</script>
