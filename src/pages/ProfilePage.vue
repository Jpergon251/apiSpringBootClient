<template>
    <div>
        <SingOutBut />



    </div>
</template>

<script>
import axios from 'axios'
import SingOutBut from '../components/SingOutBut.vue'
import store from '@/store/store';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            user: {

            }
        }
    },
    created() {
        this.loadUser();
    },
    methods: {
        async loadUser() {

            const cookieValue = Cookies.get('session');
            const decodedCookie = JSON.parse(cookieValue)
            const username = decodedCookie.username

            const userId = JSON.parse(localStorage.getItem(`userData ${username}`)).id;


            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            console.log(userId);
            const response = await axios.get('http://localhost:8080/users/' + userId, config);

            this.user = response.data;
        }
    },
    components: {
        SingOutBut
    }
}
</script>