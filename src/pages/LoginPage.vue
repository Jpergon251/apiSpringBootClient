<template>
    <main>
        <router-link to="/registro">Registrarse</router-link>
        <LoginForm />
    </main>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
    setup() {


        return {}
    },
    components: {
        LoginForm
    }
}
</script>