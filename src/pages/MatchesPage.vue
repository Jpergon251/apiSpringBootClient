<template>
    <div>
        <ul>
            <li v-for="partida in partidas" :key="partida.id">
                {{ partida.equipoGanador }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            partidas: [],
        }
    },
    created() {
        this.getPlayers();
    },
    methods: {
        async getPlayers() {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            const response = await axios.get('http://localhost:8080/partidas/', config);
            console.log(response.data);
            this.partidas = response.data
        }
    }
}
</script>
