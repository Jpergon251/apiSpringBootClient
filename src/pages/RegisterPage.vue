<template>
    <router-link to="/login">Iniciar sesion</router-link>
    <RegisterForm />
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'
export default {

    setup() {


        return {}
    },
    components: {
        RegisterForm
    }
}
</script>