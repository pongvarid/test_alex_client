import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import { Web } from './web'

@Module({ generateMutationSetters: true })
class CoreModule extends VuexModule {

    /**
       * @point async function for get data from server  
    */
    async test() {

    }
    async checkConnection() {
        return await axios.interceptors.response.use(
            response => {
                console.log(response);
                return true
            },
            error => {
                if (!error.response) {
                    return false
                }
                return false
            }
        )
    }
    async postImageHttpAlert(url: string, form: Object): Promise<any> {
        return await axios.post(url, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((r) => {
            Web.alert('Successfully executed')
            return r.data
        }).catch((e) => {
            Web.alert('Failed to edit data', 'error')
            return e.response.data
        })
    }
    async postImageHttp(url: string, form: Object): Promise<any> {
        return await axios.post(url, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((r) => {
            return r.data
        }).catch((e) => {
            return e.response.data
        })
    }
    async putImageHttp(url: string, form: Object): Promise<any> {
        try {
            return await axios.put(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((r) => {
                return r.data
            }).catch((e) => {
                return e.response.data
            })
        } catch (error) {

        }
    }
    async putImageHttpAlert(url: string, form: Object): Promise<any> {
        let check = await Web.confirm("Are you sure you want to edit the information?")
        if (check) {
            return await axios.put(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((r) => {
                Web.alert('Successfully executed')
                return r.data
            }).catch((e) => {
                Web.alert('Failed to edit data', 'error')
                return e.response.data
            })
        }
    }
    async getHttp(url: string): Promise<any> {
        try {
            return await axios.get(url).then((r: any) => {
                let data = r.data

                return data

            }).catch((e: any) => {
                let data = e.response.data
                return null
            })
        } catch (error: any) {
            console.log(error);
            return null
        }
    }
    async postHttp(url: string, form: object): Promise<any> {
        try {
            return await axios.post(url, form).then((r: any) => {
                let data = r.data
                return data
            }).catch((e: any) => {
                let data = e.response.data
                return data
            })
        } catch (error: any) {
            console.log(error);
            return null
        }
    }
    async putHttp(url: string, form: object): Promise<any> {
        try {
            return await axios.put(url, form).then((r: any) => {
                let data = r.data

                return data

            }).catch((e: any) => {
                let data = e.response.data
                return data
            })
        } catch (error: any) {
            console.log(error);
            return null
        }
    }
    async deleteHttp(url: string): Promise<any> {
        try {
            return await axios.delete(url).then((r: any) => {
                let data: any = {}

                return data

            }).catch((e: any) => {
                let data = e.response.data
                return data
            })
        } catch (error: any) {
            console.log(error);
            return null
        }
    }


}

import store from "@/vuexes"
export const Core = new CoreModule({ store, name: "Core" })
