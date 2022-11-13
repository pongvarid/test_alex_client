<template>
<div>

    <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Product <v-spacer></v-spacer>
                <v-btn text @click="run()" color="error" fab small>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <img :src="form.image" alt="">
                    <v-file-input outlined dense label="Image" v-model="form.image_product" :rules="[]"></v-file-input>
                    <v-text-field outlined dense type="text" label="Name" v-model="form.name" :rules="[$v.req]"></v-text-field>
                    <v-textarea rows="3" outlined dense type="text" label="Detail" v-model="form.detail" :rules="[]"></v-textarea>
                    <v-text-field outlined dense type="number" label="Price" v-model="form.price" :rules="[$v.req]"></v-text-field>
                    <div class="flex">
                        <v-spacer></v-spacer>
                        <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">Save</v-btn>
                    </div>
                </v-form>

            </v-card-text>
        </v-card>
    </v-dialog>

    <v-toolbar color="transparent" flat>
        <span class="font-semibold">List Products In Company</span>
         <v-spacer></v-spacer>
        <v-btn @click="dialog=true" color="primary">Add Product</v-btn>
    </v-toolbar>
    <v-data-table :search="search" :headers="headers" :items="items">

        <template v-slot:top>
            <v-text-field outlined dense v-model="search" label="ค้นหา" class="mx-4 pt-2"></v-text-field>
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
        <template v-slot:item.image="{ item }">
            <div class="p-2">
                <img class="h-20" :src="item.image" alt=""> 
            </div>
        </template>
        <template v-slot:item.action="{ item }">
            <v-btn @click="openUpdateDialog(item)" color="warning" fab small depressed>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="remove(item)" color="error" fab small depressed> 
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>

    </v-data-table>

</div>
</template>

<script>
import _ from "lodash";
export default {
    data: () => {
        return {
            items: [],
            headers: [{
                    text: 'ID',
                    sortable: true,
                    value: 'id',
                }, {
                    text: 'Name',
                    sortable: true,
                    value: 'name',
                }, {
                    text: 'Detail',
                    sortable: true,
                    value: 'detail',
                }, {
                    text: 'Image',
                    sortable: true,
                    value: 'image',
                }, {
                    text: 'Price',
                    sortable: true,
                    value: 'price',
                }, {
                    text: 'Created at',
                    sortable: true,
                    value: 'created_at',
                }, {
                    text: 'Updated at',
                    sortable: true,
                    value: 'updated_at',
                }, 
                // {
                //     text: 'Company',
                //     sortable: true,
                //     value: 'company',
                // },
                {
                    text: 'Actions',
                    sortable: false,
                    value: 'action',
                }
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
            this.items = await this.$core.getHttp(`/api/product/product/?company=${this.$auth.user.company}`);
            this.items = this.$_.map(this.items, (item) => {
                item.price = `${item.price}$`;
                return item;
            });
            await this.clearForm()
        },

        async clearForm() {
            this.form = {
                company: this.$auth.user.company,
            }
            this.dialog = false;
        },
        async openUpdateDialog(item) {
            this.form = item
            this.dialog = true
        },
        async update() {
            this.dialog = false
            let check = await this.$web.confirm('Are You Sure?')
            if (check && this.$refs.form.validate()) {
                delete this.form.image
                let data = await this.$core.putHttp('/api/product/product/' + this.form.id + '/', this.form)
                if (data.id) {
                    if (this.form.image_product) {
                        let form = new FormData()
                        form.append('image', this.form.image_product)
                        await this.$core.putImageHttp(`/api/product/product/${data.id}/`, form)
                    }
                    await this.$web.alertAuto('Update Success');
                    await this.run()
                } else {
                    await this.$web.alertAuto('Error Update', '1000', 'error');
                }
            } else {
                this.dialog = true
            }
        },
        async remove(item) {
            let check = await this.$web.confirm('Are You Sure?')
            if (check) {
                let data = await this.$core.deleteHttp('/api/product/product/' + item.id + '/')
                if (data) {
                    await this.$web.alertAuto('Delete Success');
                }
                await this.clearForm()
                await this.run()
            }
        },

        async store() {
            if (this.$refs.form.validate()) {
                let data = await this.$core.postHttp(`/api/product/product/`, this.form)
                if (data.id) {
                    if (this.form.image_product) {
                        let form = new FormData()
                        form.append('image', this.form.image_product)
                        await this.$core.putImageHttp(`/api/product/product/${data.id}/`, form)
                    }
                    await this.$web.alertAuto(`Save Success`);
                    await this.run();
                } else {
                    this.dialog = false
                    await this.$web.alertAuto('Error Save', 2000, 'error');
                    await this.run();
                }
            }
        }
    }
}
</script>
   
   © 2022
