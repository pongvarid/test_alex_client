<template>
<div>
    <div class="flex">
        <div class="flex flex-col">
            <span class="font-semibold text-xl">List Data</span>
            <span>Manage my commission</span>
        </div>
        <v-spacer></v-spacer>
        <Commission-Add @refresh="run"></Commission-Add>
    </div>
    <div>
        <v-text-field v-model="search" label="Search"></v-text-field>
        <v-data-table :headers="headers" :items="lists" :search="search"> 
            <template v-slot:item.product_data="{ item }">
                <span  class="font-semibold">{{item.product_data}}</span>
            </template>
            <template v-slot:item.total="{ item, index }">
                <span class="font-semibold text-orange-500">{{item.total}}</span>
            </template>
        </v-data-table> 
    </div>
</div>
</template>

<script>
export default {
    name: 'IndexPage',
    data() {
        return {
            response: false,
            lists: [],
            search:'',
            headers: [{
                    text: 'No',
                    value: 'no'
                },
                {
                    text: 'Product',
                    value: 'product_data'
                },
                {
                    text: 'Commission',
                    value: 'total'
                },
                {
                    text: 'Customer',
                    value: 'customer_data'
                }, 
                {
                    text: 'My Child Refferer',
                    value: 'my_child_account_data'
                }, 
                {
                    text: 'Remark',
                    value: 'remark'
                },

                {
                    text: 'Date',
                    value: 'created_at'
                },
                 

            ]
        }
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            this.lists = await this.$core.getHttp(`/api/account/commission/?account=${this.$auth.user.id}`);
            this.lists = this.$_.map(this.lists, (item,index) => {
                item.no = index+1
                item.total = `${item.total}$  (${item.percent}%)`
                item.created_at = this.$kit.dateTTH(item.created_at) 
                return item
            }) 
            this.response = true
        }
    }
}
</script>
