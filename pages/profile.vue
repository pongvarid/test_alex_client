<template>
<div class="pt-8">
  <h1 class="font-semibold text-xl">Profile</h1>
    <v-form ref="user" class="mt-4">
      <v-text-field v-model="user.username" disabled label="Username" required></v-text-field>
        <v-text-field v-model="user.first_name" label="First Name" required></v-text-field>
        <v-text-field v-model="user.last_name" label="Last Name" required></v-text-field> 
        <div class="flex">
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="update">Save</v-btn>
        </div>
    </v-form>
</div>
</template>

<script>
import { update } from 'lodash'
export default {
    name: 'ProfilePage',
    data: () => ({
        user: {}
    }),
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            this.user = await this.$core.getHttp(`/api/account/userprofile/${this.$auth.user.id}/`)
        },
        async update() {
           if(this.$refs.user.validate()){
                let user = await this.$core.putHttp(`/api/account/userprofile/${this.$auth.user.id}/`, this.user)
                if(user.id){
                  await this.$web.alert('Update Success','success', 'Profile updated successfully')
                }
                await this.run()
           }
        }
    }
}
</script>

<style>

</style>
