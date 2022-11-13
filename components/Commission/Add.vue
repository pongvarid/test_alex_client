<template>
<div>
    <v-btn depressed @click="dialog=true" color="success">Add Commission</v-btn>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="800px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Add Commission
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-stepper v-model="step" outlined>
                    <v-stepper-header>
                        <v-stepper-step :complete="step > 1" step="1">
                            Choose Customer
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="2">
                            Add Commission
                        </v-stepper-step>
                    </v-stepper-header> 
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card>
                                <v-card-text>
                                    <div v-if="mode==0" class="flex flex-col">
                                        <v-btn x-large @click="mode=1" color="info" outlined>Choose Existing Customer</v-btn>
                                        <v-btn class="mt-6" x-large  @click="mode=2" color="info" outlined>Create New Customer</v-btn>
                                    </div>
                                    <div v-if="mode==1">
                                        Choose Existing Customer
                                        <v-form ref="customer">
                                            <v-autocomplete v-model="form.customer" item-text="name" item-value="id" :items="customers" :rules="[$v.req]"></v-autocomplete>
                                        </v-form>
                                    </div>
                                    <div v-if="mode==2">
                                        <v-form ref="customer">
                                            <v-text-field label="Name" v-model="formCustomer.name" :rules="[$v.req]"></v-text-field>
                                            <v-text-field label="Phone" v-model="formCustomer.phone" :rules="[$v.req]"></v-text-field>
                                            <v-text-field label="Email" v-model="formCustomer.email"></v-text-field>
                                            <v-text-field label="Address" v-model="formCustomer.address"></v-text-field>
                                        </v-form>
                                    </div> 
                                </v-card-text>
                                <v-card-actions v-if="mode==1 || mode==2">
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="mode=0">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="primary" @click="goStep2()">
                                        Continue
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card  >
                                <v-card-text>
                                    <v-select item-value="id" item-text="name_full" :items="products" v-model="form.product" label="Choose product"></v-select>
                                </v-card-text>
                                <v-card-actions >
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="step=1">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="primary" @click="storeData()">
                                            Continue
                                        </v-btn>
                                </v-card-actions>
                            </v-card> 
                        </v-stepper-content> 
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from "nuxt-property-decorator"
@Component({
    components: {},
})
export default class Add extends Vue {

    private dialog: boolean = false
    private step: Number = 1
    private mode: Number = 0
    private form: any = {}
    private formCustomer: any = {}
    private customers: any = []
    private products: any = []
    $core: any
    $auth: any
    $refs: any
    $_:any 

    private async created() {
        await this.run()
    }

    private async run(){
        await this.getProduct()
        await this.getCustomer()
    }
    private async getProduct() {
        this.products = await this.$core.getHttp(`/api/product/product/?company=${this.$auth.user.company}`)
        this.products = this.$_.map(this.products, (item: any) => {
            item.name_full = `${item.name} - ${item.price}$`
            return item
        })
        this.dialog = false
    }

    private async getCustomer() {
        this.customers = await this.$core.getHttp(`/api/company/customer/?sale=${this.$auth.user.id}`)
    }

    private async goStep2() {
        if (this.$refs.customer.validate()) {
            this.step = 2
        }
    }

    private async storeData() {
        if (this.mode == 2) {
            let customer = await this.$core.postHttp(`/api/company/customer/`, this.formCustomer)
            this.form.customer = customer.id
        }
        this.form.sale = this.$auth.user.id
        this.form.company = this.$auth.user.company
        await this.$core.postHttp(`/api/account/commission/`, this.form)
        await this.run();
        this.$emit('refresh')
    }

}
</script>

<style>

</style>
