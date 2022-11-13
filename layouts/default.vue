<template>
<v-app dark>

    <v-app-bar  fixed app  v-if="response">
        <h2 class="font-semibold">Test Alex</h2>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/')" text>Home</v-btn>
        <v-btn @click="$router.push('/product')" text>Product</v-btn>
        <v-btn @click="$router.push('/company')" text>Company</v-btn>
        <v-btn @click="$router.push('/profile')"  text>Profile</v-btn>
        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
        <v-container v-if="response">
            <Nuxt />
        </v-container>
    </v-main>

    <v-footer absolute app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            response: false,

        }
    },
    async mounted() {
        await this.$auth.setCookies(this.$cookies)
        await this.$auth.checkUserLogin();
        this.response = true; 
    },
    methods:{
        async logout(){
            await this.$auth.setCookies(this.$cookies)
            await this.$auth.logout();
        }
    },
    watch: {
        async $route(to, from) {
            await this.$auth.checkUserLogin()
        }
    }

}
</script>
