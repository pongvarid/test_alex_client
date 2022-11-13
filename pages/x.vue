<template>
    <div>
        <br><br>
        <!-- <pre>{{maps}}</pre> -->
        <xmp>
            {{t}}
            {{forms}}
            {{tables}}
            {{et}}
            {{script}}
        </xmp>
    </div>
    </template>
    
    <script>
        import axios from '@/plugins/axios'
        import _ from 'lodash'
        export default {
        
            data: () => {
                return ({
                    t: '<template> <div> ',
                    et: '</div> </template>',
                    dhtml: '',
                    forms: '',
                    tables: '',
                    script: '',
                    host: '/api/company/officecommission/',
                    maps:{}
                })
            },
            async created() {
          
                let data = await axios.options(`${this.host}`).then(
                    (r) => {
                        return r.data
                    }
                )
                let lists = data.actions.POST
                let objs = Object.keys(lists);
                let raw = _.values(lists)
                let maps = _.map(raw, (r, index) => {
                    let obj = r
                    obj.key = objs[index]
                    obj.type2 = this.getType(r.type)
                    obj.label = (r.type == "nested object") ? obj.label + '(FK)' : obj.label
                    return obj
                })
                this.maps = maps
                this.forms = await this.genForm(maps)
                this.tables = await this.getDatable(maps)
                this.script = await this.getScript(maps)
            },
            methods: {
                async genForm(maps) {
                    let html = `<v-form ref="form">\n`
                    for (let index = 0; index < maps.length; index++) {
                        let f = maps[index]
                        if(f.key != 'id' && f.key != 'created_at' && f.key != 'updated_at'){
                         html = html + `<v-text-field  outlined dense  type="${this.getType(f.type)}"  label="${f.label}" v-model="form.${f.key}"  :rules="[${(f.required)?"v => !!v || '"+ f.label +"  is require' ":""}]" ></v-text-field>\n`
    
                        }
                    }
                    html = html + `<div class="flex">
                            <v-spacer></v-spacer>
                            <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">Save</v-btn>
                        </div>\n`
                    html = html + '</v-form>\n'
    
                    let data = `
                 <v-dialog \n
                    v-model="dialog"
                    scrollable   
                    persistent 
                    max-width="500px"
                    transition="dialog-transition"
                >  
                    <v-card>  
                    <v-card-title primary-title> 
                        Manage Data <v-spacer></v-spacer>
                        <v-btn text @click="closeDialog()" color="error"><v-icon>mdi-close</v-icon></v-btn> 
                    </v-card-title> 
                    <v-card-text> 
                        ${html} 
                    </v-card-text> 
                    </v-card> 
                </v-dialog> 
                `
                    return data
                },
                async getDatable(maps) {
                        let html = ''
                        html = html + `
                          <v-toolbar color="transparent" flat>
                        List Data<v-spacer></v-spacer>
                        <v-btn @click="dialog=true" color="primary">Add Data</v-btn> 
                    </v-toolbar> \n
                  <v-data-table    :search="search" 
                    :headers="headers"
                    :items="items"  >
    
                    <template v-slot:top> 
                            <v-text-field outlined dense v-model="search" label="Search" class="mx-4 pt-2"></v-text-field>
                        </template> 
                        
                      <template v-slot:item.id="{ item, index }">
                    {{index+1}}
                </template>
                      <template v-slot:item.created_at="{ item }">
                            {{core.dateTTH(item.created_at)}}
                    </template>
                      <template v-slot:item.updated_at="{ item }">
                         {{core.dateTTH(item.created_at)}}
                    </template>
                        <template v-slot:item.action="{ item }">
                            <v-btn fab small  @click="openUpdateDialog(item)" color="warning"  ><v-icon>mdi-pencil</v-icon></v-btn>
                            <v-btn fab small  @click="remove(item)"  color="error"     ><v-icon>mdi-delete</v-icon> </v-btn>
                    </template>
    
                </v-data-table>
                `
                //  html = html+ 'headers:[\n'
                // for (let index = 0; index < maps.length; index++) {
                //     let f = maps[index]
                //     html = html + `{
                //         text: '${f.label}', 
                //         sortable: true,
                //         value: '${f.key}',
                //     },`
                // } 
                // html = html + `\n{
                //       text: 'จัดการ', 
                //         sortable: false,
                //         value: 'action',
                // }]\n`
                return html
            },
            getType(type) {
                if (type == 'string') {
                    return 'text'
                } else if (type == 'integer') {
                    return 'number'
                }else {
                    return type
                }
            },
    
            getScript(datas){
                let html = '<script>'
                html = html + 'import { Core } from "@/vuexes/core";\n'
                html = html + 'import { Web } from "@/vuexes/web";\n'
                html = html + 'import { Auth } from "@/vuexes/auth";\n'
                html = html + 'import _ from "lodash";\n'
                 html = html + 'import moment from "moment";\n'
                html = html + 'export default {\n'
                html = html + 'data: () => {\n'
                html = html + 'return {\n'
                html = html + 'req: v => !!v || "Field is require",\n' 
                html = html + 'items: [],\n'
                html = html + 'headers: [\n'
                for (let index = 0; index < datas.length; index++) {
                    let f = datas[index]
                    html = html + `{
                        text: '${f.label}', 
                        sortable: true,
                        value: '${f.key}',
                    },`
                } 
                html = html + `\n{
                      text: 'จัดการ', 
                        sortable: false,
                        value: 'action',
                }],\n`
                html = html + 'page: 1,\n'
                html = html + 'maxPage: 3,\n'
                html = html + 'search: "",\n'  
                html = html + 'form: {},\n'
                html = html + 'core: Core,\n'
                html = html + 'dialog: false,\n'
                html = html + '};\n'
                html = html + '},\n'
                html = html + 'async created() {\n'
                html = html + 'await this.run();\n'
                html = html + '},methods:{\n'
                html = html + 'async run() {\n'
                html = html + 'this.items = await Core.getHttp(`'+this.host+'?page=${this.page}&search=${this.search}`);\n'
                html = html + 'await this.closeDialog()\n'
                html = html + '},\n'
                html = html +   this.genUpdate()
                html = html + 'async store() {\n'
                 html = html + 'if(this.$refs.form.validate()) {\n'
                html = html + 'let data = await Core.postHttp(`'+this.host+'`, this.form)\n'
                html = html + 'if (data.id) {\n'
                html = html + 'await Web.alertAuto(`Save Success`); \n await this.run(); }'+`else{
                        this.dialog = false
                        await Web.alertAuto('Save is not Success',2000,'error'); 
                        await this.run();
                    }`+' \n}\n}\n}\n}\n </'+'script'+'>'
                html = html + ""
                  return html
            },
              genUpdate(){
                let html = `
                async closeDialog(){
                    this.form = {}
                    this.dialog = false; 
                },
                async openUpdateDialog(item){
                    this.form = item
                    this.dialog = true
                }, 
                async update() {\n 
                    this.dialog = false
                    let check = await Web.confirm('Are you sure?')
                    if(check && this.$refs.form.validate()){
                    let data = await Core.putHttp('${this.host}'+this.form.id+'/',this.form)
                    if(data.id){
                        await Web.alertAuto('Save Success');
                        await this.closeDialog()
                        await this.run()
                    } else{
                            await Web.alertAuto('Delete is not Success','1000','error');
                    } }else{
                        this.dialog = true
                    }
                },  
                async remove(item){
                    let check = await Web.confirm('Are you sure?')
                    if(check){
                        let data = await Core.deleteHttp('${this.host}'+item.id+'/')
                        if(data){
                            await Web.alertAuto('Delete Success');
                        } 
                        await this.closeDialog()
                        await this.run()
                    }
                }, 
    
                `
                return html
            }  
    
        }
    }
    </script>
    
    <style>
    </style>
    