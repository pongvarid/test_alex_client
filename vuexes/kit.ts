import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

import _ from "lodash"
import { Core } from '@/vuexes/core'
import moment from 'moment'

@Module({ generateMutationSetters: true })
class KitModule extends VuexModule {

    /**
    * @point non async function for get data tool  
    */
    d2(num: number) {
        try {
            return Number((num).toFixed(2))
        } catch (error) {
            console.log(error)
            return num
        }
    }
    convertDate(date: any) {
        return moment(date).format('DD/MM/YYYY');
    }
    dateTH(date?: moment.Moment) {
        
        let day = moment(date).format('dddd')
        return day + ' ' + moment(date).format('DD/MM/YYYY')
    }
    dateTTH(date?: moment.Moment) { 
        let day = moment(date).format('dddd')
        return day + ' ' + moment(date).format('DD/MM/YYYY HH:mm:ss')
    }
    comma(x: number) {
        try {
            let y = Number(x)
            let num = Number(y.toFixed(2))
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } catch (error: any) {
            console.error(error)
            return x
        }
    }

    /**
    * @point async function for get data tool 
    */
    async generateCodeId(code: string = 'EF') {
        return code + moment().format('DDMMYYYYHHmmss');
    }
    async getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    async dataURLtoFile(dataurl: any) {
        let moment = require('moment')
        let date = moment();
        let extension = dataurl.substring("data:image/".length, dataurl.indexOf(";base64"))
        let filename = `${date.format('ddDDmmyyhhmmss')}.${extension}`
        console.log(filename);
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    async fileToBase64(file: any, callback: any,) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    async sentLine(message: any) {
        return await Core.postHttp(`/api/qline/`, { message: message })
    }
    public async arrayToString(arr: any) {
        let str = ''
        arr.map((o: any) => {
            str += o + ','
        })
        return str
    }
    public group2Aarry(arr: any, groupBy: any) {
        return _(arr).groupBy(groupBy).map((value, key) => ({
            [groupBy]: key,
            value
        })).value();
    }

}

import store from "@/vuexes"
export const Kit = new KitModule({ store, name: "Kit" })

