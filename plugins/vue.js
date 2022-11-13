import Vue from 'vue'  
import moment from 'moment'
import _ from 'lodash'
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
import { Kit } from '@/vuexes/kit' 

import VueCookies from 'vue-cookies'
Vue.use(VueCookies, { expires: '7d'})

Vue.prototype.$url  = process.env.baseURL 

Vue.prototype.$moment = moment
Vue.prototype.$_ = _
Vue.prototype.$core = Core
Vue.prototype.$auth = Auth
Vue.prototype.$web = Web
Vue.prototype.$kit = Kit 
 
 
Vue.prototype.$go = async (path)=> { 
   await $nuxt.$router.push(path) 
}
Vue.prototype.$re = async (path)=> { 
    await $nuxt.$router.replace(path) 
 }

 Vue.prototype.$currentPath = ()=> { 
    return $nuxt.$route.path
 }
 Vue.prototype.$currentPathName = ()=> { 
   return $nuxt.$route.name
}

Vue.prototype.$v ={
    req: (v) => !!v || 'This field is required', 
    email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',  
    mm13: (v) => (v && v.length == 13) || 'Max 13 characters', 
    number: (v) => (v && (!isNaN(parseFloat(v)))) || 'Number Only',
}
