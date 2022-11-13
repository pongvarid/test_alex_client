(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{790:function(e,t,n){"use strict";n.r(t);var r=n(2),o=(n(45),n(22),n(8),n(46),n(61),n(37),n(56)),c=n(142),l=n.n(c),m={data:function(){return{t:"<template> <div> ",et:"</div> </template>",dhtml:"",forms:"",tables:"",script:"",host:"/api/company/officecommission/",maps:{}}},created:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data,n,r,c,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.options("".concat(e.host)).then((function(e){return e.data}));case 2:return data=t.sent,n=data.actions.POST,r=Object.keys(n),c=l.a.values(n),m=l.a.map(c,(function(t,n){var o=t;return o.key=r[n],o.type2=e.getType(t.type),o.label="nested object"==t.type?o.label+"(FK)":o.label,o})),e.maps=m,t.next=10,e.genForm(m);case 10:return e.forms=t.sent,t.next=13,e.getDatable(m);case 13:return e.tables=t.sent,t.next=16,e.getScript(m);case 16:e.script=t.sent;case 17:case"end":return t.stop()}}),t)})))()},methods:{genForm:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var html,r,o,data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:for(html='<v-form ref="form">\n',r=0;r<e.length;r++)"id"!=(o=e[r]).key&&"created_at"!=o.key&&"updated_at"!=o.key&&(html+='<v-text-field  outlined dense  type="'.concat(t.getType(o.type),'"  label="').concat(o.label,'" v-model="form.').concat(o.key,'"  :rules="[').concat(o.required?"v => !!v || '"+o.label+"  is require' ":"",']" ></v-text-field>\n'));return html+='<div class="flex">\n                            <v-spacer></v-spacer>\n                            <v-btn @click="(form.id)?update():store()" :color="(form.id)?\'warning\':\'success\'">Save</v-btn>\n                        </div>\n',data='\n                 <v-dialog \n\n                    v-model="dialog"\n                    scrollable   \n                    persistent \n                    max-width="500px"\n                    transition="dialog-transition"\n                >  \n                    <v-card>  \n                    <v-card-title primary-title> \n                        Manage Data <v-spacer></v-spacer>\n                        <v-btn text @click="closeDialog()" color="error"><v-icon>mdi-close</v-icon></v-btn> \n                    </v-card-title> \n                    <v-card-text> \n                        '.concat(html+="</v-form>\n"," \n                    </v-card-text> \n                    </v-card> \n                </v-dialog> \n                "),n.abrupt("return",data);case 6:case"end":return n.stop()}}),n)})))()},getDatable:function(e){return Object(r.a)(regeneratorRuntime.mark((function e(){var html;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return html="",html+='\n                          <v-toolbar color="transparent" flat>\n                        List Data<v-spacer></v-spacer>\n                        <v-btn @click="dialog=true" color="primary">Add Data</v-btn> \n                    </v-toolbar> \n\n                  <v-data-table    :search="search" \n                    :headers="headers"\n                    :items="items"  >\n    \n                    <template v-slot:top> \n                            <v-text-field outlined dense v-model="search" label="Search" class="mx-4 pt-2"></v-text-field>\n                        </template> \n                        \n                      <template v-slot:item.id="{ item, index }">\n                    {{index+1}}\n                </template>\n                      <template v-slot:item.created_at="{ item }">\n                            {{core.dateTTH(item.created_at)}}\n                    </template>\n                      <template v-slot:item.updated_at="{ item }">\n                         {{core.dateTTH(item.created_at)}}\n                    </template>\n                        <template v-slot:item.action="{ item }">\n                            <v-btn fab small  @click="openUpdateDialog(item)" color="warning"  ><v-icon>mdi-pencil</v-icon></v-btn>\n                            <v-btn fab small  @click="remove(item)"  color="error"     ><v-icon>mdi-delete</v-icon> </v-btn>\n                    </template>\n    \n                </v-data-table>\n                ',e.abrupt("return",html);case 3:case"end":return e.stop()}}),e)})))()},getType:function(e){return"string"==e?"text":"integer"==e?"number":e},getScript:function(e){var html="<script>";html+='import { Core } from "@/vuexes/core";\n',html+='import { Web } from "@/vuexes/web";\n',html+='import { Auth } from "@/vuexes/auth";\n',html+='import _ from "lodash";\n',html+='import moment from "moment";\n',html+="export default {\n",html+="data: () => {\n",html+="return {\n",html+='req: v => !!v || "Field is require",\n',html+="items: [],\n",html+="headers: [\n";for(var t=0;t<e.length;t++){var n=e[t];html+="{\n                        text: '".concat(n.label,"', \n                        sortable: true,\n                        value: '").concat(n.key,"',\n                    },")}return html+="\n{\n                      text: 'จัดการ', \n                        sortable: false,\n                        value: 'action',\n                }],\n",html+="page: 1,\n",html+="maxPage: 3,\n",html+='search: "",\n',html+="form: {},\n",html+="core: Core,\n",html+="dialog: false,\n",html+="};\n",html+="},\n",html+="async created() {\n",html+="await this.run();\n",html+="},methods:{\n",html=(html+="async run() {\n")+"this.items = await Core.getHttp(`"+this.host+"?page=${this.page}&search=${this.search}`);\n",html+="await this.closeDialog()\n",html+="},\n",html+=this.genUpdate(),html+="async store() {\n",html=(html+="if(this.$refs.form.validate()) {\n")+"let data = await Core.postHttp(`"+this.host+"`, this.form)\n",html+="if (data.id) {\n",html+="await Web.alertAuto(`Save Success`); \n await this.run(); }else{\n                        this.dialog = false\n                        await Web.alertAuto('Save is not Success',2000,'error'); \n                        await this.run();\n                    } \n}\n}\n}\n}\n <\/script>",html+=""},genUpdate:function(){return"\n                async closeDialog(){\n                    this.form = {}\n                    this.dialog = false; \n                },\n                async openUpdateDialog(item){\n                    this.form = item\n                    this.dialog = true\n                }, \n                async update() {\n \n                    this.dialog = false\n                    let check = await Web.confirm('Are you sure?')\n                    if(check && this.$refs.form.validate()){\n                    let data = await Core.putHttp('".concat(this.host,"'+this.form.id+'/',this.form)\n                    if(data.id){\n                        await Web.alertAuto('Save Success');\n                        await this.closeDialog()\n                        await this.run()\n                    } else{\n                            await Web.alertAuto('Delete is not Success','1000','error');\n                    } }else{\n                        this.dialog = true\n                    }\n                },  \n                async remove(item){\n                    let check = await Web.confirm('Are you sure?')\n                    if(check){\n                        let data = await Core.deleteHttp('").concat(this.host,"'+item.id+'/')\n                        if(data){\n                            await Web.alertAuto('Delete Success');\n                        } \n                        await this.closeDialog()\n                        await this.run()\n                    }\n                }, \n    \n                ")}}},d=n(88),component=Object(d.a)(m,(function(){var e=this,t=e._self._c;return t("div",[t("br"),t("br"),e._v(" "),t("xmp",[e._v("\n        "+e._s(e.t)+"\n        "+e._s(e.forms)+"\n        "+e._s(e.tables)+"\n        "+e._s(e.et)+"\n        "+e._s(e.script)+"\n    ")])],1)}),[],!1,null,null,null);t.default=component.exports}}]);