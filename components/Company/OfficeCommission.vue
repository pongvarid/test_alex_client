<template>
 <div>

     <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
         <v-card>
             <v-card-title primary-title>
                 Manage Data <v-spacer></v-spacer> 
             </v-card-title>
             <v-card-text>
                 <v-form ref="form">
                     <v-text-field outlined dense type="float" label="Percent" v-model="form.percent" :rules="[]"></v-text-field>
                     <v-text-field outlined dense type="float" label="Total" v-model="form.total" :rules="[]"></v-text-field>
                     <v-text-field outlined dense type="text" label="Remark" v-model="form.remark" :rules="[v => !!v || 'Remark  is require' ]"></v-text-field>
                     <v-text-field outlined dense type="field" label="Company" v-model="form.company" :rules="[v => !!v || 'Company  is require' ]"></v-text-field>
                     <div class="flex">
                         <v-spacer></v-spacer>
                         <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">Save</v-btn>
                     </div>
                 </v-form>

             </v-card-text>
         </v-card>
     </v-dialog>

     <v-toolbar color="transparent" flat>
         List Data<v-spacer></v-spacer>
         <v-btn @click="dialog=true" color="primary">Add Data</v-btn>
     </v-toolbar>

     <v-data-table :search="search" :headers="headers" :items="items">

         <template v-slot:top>
             <v-text-field outlined dense v-model="search" label="Search" class="mx-4 pt-2"></v-text-field>
         </template>

         <template v-slot:item.id="{ item, index }">
             {{index+1}}
         </template>
         <template v-slot:item.created_at="{ item }">
             {{$kit.dateTTH(item.created_at)}}
         </template>
         <template v-slot:item.updated_at="{ item }">
             {{$kit.dateTTH(item.created_at)}}
         </template> 
     </v-data-table>

 </div>
</template>

<script> 
import _ from "lodash"; 
export default {
    data: () => {
        return {
            req: v => !!v || "Field is require",
            items: [],
            headers: [{
                    text: 'ID',
                    sortable: true,
                    value: 'id',
                }, {
                    text: 'Percent',
                    sortable: true,
                    value: 'percent',
                }, {
                    text: 'Total',
                    sortable: true,
                    value: 'total',
                }, {
                    text: 'Remark',
                    sortable: true,
                    value: 'remark',
                }, {
                    text: 'Created at',
                    sortable: true,
                    value: 'created_at',
                }, {
                    text: 'Updated at',
                    sortable: true,
                    value: 'updated_at',
                }, {
                    text: 'Company',
                    sortable: true,
                    value: 'company',
                },
              
            ],
            page: 1,
            maxPage: 3,
            search: "",
            form: {}, 
            dialog: false,
        };
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            this.items = await this.$core.getHttp(`/api/company/officecommission/?page=${this.page}&search=${this.search}`);
            
        },

         
    }
}
</script>
