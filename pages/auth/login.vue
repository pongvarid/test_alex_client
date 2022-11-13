<template>
<div class="h-screen">
    <div class="flex flex-col  justify-center h-full">
        <v-card>
            <v-card-title primary-title>
                Login
            </v-card-title>
            <v-card-text>
                <v-form ref="vform">
                    <v-text-field v-model="form.username" label="Username" prepend-icon="mdi-account" type="email"></v-text-field>
                    <v-text-field v-model="form.password" label="Password" prepend-icon="mdi-lock" type="password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</div>
</template>

<script>
export default {
    layout: 'auth',
    data() {
        return {
            form: {}
        }
    },
    methods: {
        async login() {
            let vform = this.$refs.vform;
            if (vform.validate()) {
                await this.$auth.login(this.form)
            }
        } 
    }
}
</script>

<style>
  
  </style>
