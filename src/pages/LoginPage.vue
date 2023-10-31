<template>
    <router-link to="/registro">Registrarse</router-link>
    <LoginForm />
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