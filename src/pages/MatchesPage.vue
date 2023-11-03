<template>
    <div>
        <ul>
            <li v-for="partida in partidas" :key="partida.id">
                <h2>{{ partida.equipoVisitante.nombre }} vs {{ partida.equipoLocal.nombre }}</h2>
                <span>{{ partida.fecha }}</span>
            </li>
        </ul>
    </div>
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
        }
    }
}
</script>
