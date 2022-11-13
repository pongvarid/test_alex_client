<template>
<v-app  >
    
    <v-main>
        <v-container  >
            <Nuxt />
        </v-container>
    </v-main>
  
</v-app>
</template>

<script>
export default {
    async mounted() {
        await this.$auth.setCookies(this.$cookies) 
        await this.$auth.checkUserLogin();  
    },
}
</script>

<style>

</style>