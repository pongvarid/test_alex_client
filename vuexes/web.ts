import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import _ from "lodash"
import Swal from 'sweetalert2' 

@Module({ generateMutationSetters: true })
class WebModule extends VuexModule {

    public loading: boolean = false;
    public draw: boolean = true

    public async drawSwitch() {
        this.draw = !this.draw
    }

    public async sleep(msec: any) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }
  
    public async switchLoad(load: boolean) { 
        this.loading = load
    }
 
    public async offLoad() {
        this.loading = false
    }
    public async alert(title: any = 'OK', type: any = 'success', text: any = '') {
        await Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonText: `OK`,
            confirmButtonColor: "#2196F3",
        })
    }
    public async alertAuto(title: any = 'OK', timer: any = 2000, type: any = 'success', text: any = '') {
        await Swal.fire({
            showConfirmButton: false,
            icon: type,
            title: title,
            text: text,
            timer: timer,
            confirmButtonColor: "#2196F3",

        })
    }
    public async alertnotfound(title: any = 'OK', type: any = 'error', text: any = '') {
        await Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonText: `OK`,
            confirmButtonColor: "#ef4444",
        })
    }
    public async alerterror(title: any = 'Please click the link from the email again.', type: any = 'error', text: any = '') {
        await Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonText: `OK`,
            confirmButtonColor: "#ef4444",
        })
    }
    public async confirm(title: any = 'Are you sure ?', text = "", img = "") {

        let check = await Swal.fire({
            title: title,
            text: text,
            imageUrl: img,
            showCancelButton: true,
            imageWidth: 200,
            confirmButtonText: `OK`,
            cancelButtonText: `Cancel`,
            confirmButtonColor: "#2196F3",
        }).then((result: any) => {
            return result.isConfirmed
        })
        return check
    }
    public async confirmInput(title: any = 'Are you sure ?', text = "ss", img = "") {

        let check = Swal.fire({
            title: title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login: any) => {
                return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result: any) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
            }
        })
    }

}

import store from "@/vuexes"
export const Web = new WebModule({ store, name: "Web" })
