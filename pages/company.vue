<template>
<div>
    <v-toolbar color="transparent" flat>
        <h1 class="font-semibold">{{company.name}}</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog=true">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </v-toolbar>
    <div>
        <span class="font-semibold">My Tier: Level {{tier.level}} ({{tier.percent}}%)</span>
    </div>

    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-card-title primary-title>
                Edit Company
            </v-card-title>
            <v-card-text>
                <v-form ref="company">
                    <v-text-field :rules="[$v.req]" v-model="company.name" label="Name"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="updateCompany()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-tabs>
        <v-tab> My Referrer </v-tab>
        <v-tab> Tier </v-tab>
        <v-tab> Customers </v-tab>
        <v-tab> Office Commission </v-tab>
        <v-tab-item>
            <div class="pt-6">
                <h2 class="font-semibold">Master</h2>
                <v-timeline dense>
                    <v-timeline-item v-for="(master, i) in masters" :key="i">
                        <div class="flex flex-col">
                            <span class="font-semibold">{{master.data}}</span>
                            <span>{{$kit.dateTTH(master.created_at)}}</span>
                        </div>
                    </v-timeline-item>
                </v-timeline>
                <h2 class="font-semibold">Childs</h2>
                <v-timeline dense>
                    <v-timeline-item v-for="(child, i) in childs" :key="i">
                        <div class="flex flex-col">
                            <span class="font-semibold">{{child.data}}</span>
                            <span>{{$kit.dateTTH(child.created_at)}}</span>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </v-tab-item>
        <v-tab-item>
            <div>
              <Company-Tier></Company-Tier>
            </div>
        </v-tab-item>
        <v-tab-item>
          <div>
            <Company-Customers></Company-Customers>
          </div>
        </v-tab-item>
        <v-tab-item>
            <div>
                <Company-OfficeCommission></Company-OfficeCommission>
            </div>
        </v-tab-item>
    </v-tabs>
</div>
</template>

<script>
export default {
    name: 'Company',
    data() {
        return {
            company: {},
            masters: [],
            childs: [],
            dialog: false,
            tier: {}
        }
    },
    async created() {
        await this.run();
    },

    methods: {
        async run() {
            await this.getRefferer();
            await this.getCompany();
            await this.getTier()
        },
        async getCompany() {
            this.company = await this.$core.getHttp(`/api/company/company/${this.$auth.user.company}/`)
        },
        async getRefferer() {
            this.masters = await this.$core.getHttp(`/api/account/referrer/?child=${this.$auth.user.id}`)
            this.masters = this.$_.orderBy(this.$_.map(this.masters, (item, index) => {
                item.no = index + 1;
                item.data = item.master_data
                return item;
            }), [function (o) {
                return o.master_data;
            }])
            this.childs = await this.$core.getHttp(`/api/account/referrer/?master=${this.$auth.user.id}`)
            this.childs = this.$_.orderBy(this.$_.map(this.childs, (item, index) => {
                item.no = index + 1;
                item.data = item.child_data
                return item;
            }), [function (o) {
                return o.child_data;
            }])
        },
        async updateCompany() {
            if (this.$refs.company.validate()) {
                let update = await this.$core.putHttp(`/api/company/company/${this.$auth.user.company}/`, this.company)
                if (update.id) {
                    await this.$web.alert('Update Success', 'success', 'Company has been updated')
                }
                this.dialog = false
                await this.run();
            }
        },
        async getTier() {
            this.tier = await this.$core.getHttp(`/api/company/tier/${this.$auth.user.tier}/`)
        }
    }

}
</script>

<style>

</style>
