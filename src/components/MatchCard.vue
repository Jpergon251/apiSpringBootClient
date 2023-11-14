<template>
    <section class="equipos-partida">
        <section class="equipo-container">
            <figure class="equipo-logo">
                <img class="equipo-logo-imagen" :src="partida.equipoLocal.logo" alt="Logo equipo">
            </figure>
            <h2 class="equipo-nombre">{{ partida.equipoLocal.nombre }}</h2>
            <p class="equipo-estado" :class="partida.equipoGanador === partida.equipoLocal.nombre ? 'Victoria' : 'Derrota'">
                {{
                    partida.equipoGanador === partida.equipoLocal.nombre ? 'Victoria' :
                    'Derrota' }}</p>
        </section>
        <span class="versus">VS</span>
        <section class="equipo-container">
            <figure class="equipo-logo">
                <img class="equipo-logo-imagen" :src="partida.equipoVisitante.logo" alt="Logo equipo">
            </figure>
            <h2 class="equipo-nombre">{{ partida.equipoVisitante.nombre }}</h2>
            <p class="equipo-estado"
                :class="partida.equipoGanador === partida.equipoVisitante.nombre ? 'Victoria' : 'Derrota'">{{
                    partida.equipoGanador === partida.equipoVisitante.nombre ? 'Victoria' :
                    'Derrota' }}
            </p>
        </section>
    </section>
    <span class="fecha-partida">{{ formatFecha(partida.fecha) }}</span>
</template>

<script>

export default {
    props: {
        partida: {
            type: Object,
            required: true
        }
    },
    name: 'MatchCard',
    methods: {
        formatFecha(fecha) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(fecha).toLocaleDateString(undefined, options);
        },
    },
}
</script>