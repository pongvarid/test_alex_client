<template>
<div>

    <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Manage Data <v-spacer></v-spacer>
                <v-btn text @click="closeDialog()" color="error">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="mt-2">
                    <v-text-field outlined dense type="text" label="Name" v-model="form.name" :rules="[req]"></v-text-field>
                    <v-text-field outlined dense type="text" label="Phone" v-model="form.phone" :rules="[req]"></v-text-field>
                    <v-text-field outlined dense type="text" label="Email" v-model="form.email" :rules="[]"></v-text-field>
                    <v-text-field outlined dense type="text" label="Address" v-model="form.address" :rules="[]"></v-text-field>
                    <div class="flex">
                        <v-spacer></v-spacer>
                        <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">Save</v-btn>
                    </div>
                </v-form>

            </v-card-text>
        </v-card>
    </v-dialog>

    <v-toolbar color="transparent" flat>
        <span class="font-semibold">List Customer</span>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" color="primary">Add Customer</v-btn>
    </v-toolbar>

    <v-data-table :search="search" :headers="headers" :items="items">

        <template v-slot:top>
            <v-text-field outlined dense v-model="search" label="Search" class="mx-4 pt-2"></v-text-field>
        </template>
        <template v-slot:item.created_at="{ item }">
            {{$kit.dateTTH(item.created_at)}}
        </template>
        <template v-slot:item.updated_at="{ item }">
            {{$kit.dateTTH(item.created_at)}}
        </template>
        <template v-slot:item.action="{ item }">
            <v-btn depressed fab small @click="openUpdateDialog(item)" color="warning">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn depressed fab small @click="remove(item)" color="error">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>

    </v-data-table>

</div>
</template>

<script>
export default {
    data: () => {
        return {
            req: v => !!v || "Field is require",
            items: [],
            headers: [{
                    text: 'No',
                    sortable: true,
                    value: 'id',
                }, {
                    text: 'Name',
                    sortable: true,
                    value: 'name',
                }, {
                    text: 'Phone',
                    sortable: true,
                    value: 'phone',
                }, {
                    text: 'Email',
                    sortable: true,
                    value: 'email',
                }, {
                    text: 'Address',
                    sortable: true,
                    value: 'address',
                },
                {
                    text: 'Sale',
                    sortable: true,
                    value: 'sale_data',
                },
                {
                    text: 'Created at',
                    sortable: true,
                    value: 'created_at',
                }, {
                    text: 'Updated at',
                    sortable: true,
                    value: 'updated_at',
                },
                {
                    text: 'Action',
                    sortable: false,
                    value: 'action',
                }
            ],
            form: {},
            dialog: false,
            search: '',
        };
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            this.items = await this.$core.getHttp(`/api/company/customer/?sale__company=${this.$auth.user.company}`);
            await this.closeDialog()
        },

        async closeDialog() {
            this.form = {
                sale: this.$auth.user.id
            }
            this.dialog = false;
        },
        async openUpdateDialog(item) {
            this.form = item
            this.dialog = true
        },
        async update() {

            this.dialog = false
            let check = await this.$web.confirm('Are you sure?')
            if (check && this.$refs.form.validate()) {
                let data = await this.$core.putHttp('/api/company/customer/' + this.form.id + '/', this.form)
                if (data.id) {
                    await this.$web.alertAuto('Save Success');
                    await this.closeDialog()
                    await this.run()
                } else {
                    await this.$web.alertAuto('Delete is not Success', '1000', 'error');
                }
            } else {
                this.dialog = true
            }
        },
        async remove(item) {
            let check = await this.$web.confirm('Are you sure?')
            if (check) {
                let data = await this.$core.putHttp('/api/company/customer/' + item.id + '/', {
                    is_active: false
                })
                if (data) {
                    await this.$web.alertAuto('Delete Success');
                }
                await this.closeDialog()
                await this.run()
            }
        },

        async store() {
            if (this.$refs.form.validate()) {
                let data = await this.$core.postHttp(`/api/company/customer/`, this.form)
                if (data.id) {
                    await this.$web.alertAuto(`Save Success`);
                    await this.run();
                } else {
                    this.dialog = false
                    await this.$web.alertAuto('Save is not Success', 2000, 'error');
                    await this.run();
                }
            }
        }
    }
}
</script>
