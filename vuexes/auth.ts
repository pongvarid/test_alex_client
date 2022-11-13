import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import Vue from 'vue'
import _ from "lodash"
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'
import axios from '@/plugins/axios'

@Module({ generateMutationSetters: true })
class AuthModule extends VuexModule {
    /**
    * @point Base Variable สำหรับเก็บข้อมูล user ลงใน store
    */
    public cookies:any = null
    private token: any = null
    public user: any = null

    /**
    * @point Custom Variable สำหรับเก็บข้อมูล user ลงใน store
    */
    public tier: any = null
    public point: any = null
    /**
    * @point สำหรับรันเมื่อ login สำเร็จ และ สามารถโยนข้อมูล user เข้าไปใน method นี้ได้เลย
    */
    public async setCookies(cookies:any) {
        console.log(cookies);
        this.cookies =  cookies
        await this.startCookie();
    }
    public async getThenLogin(user: any) {


    }

    /**
    * @point Base Function สำหรับเก็บข้อมูล user ลงใน store
    */
    public async startCookie() {
        this.token = this.cookies.get('token')
    }
    public async setUser() {
        let user = await this.getUser();
        this.user = user
        return user
    }

    public async getUser() {
        try {
            let baseUser = await Core.getHttp(`/api/auth/v1/user/`)
            if (baseUser.pk) {
                let user = await Core.getHttp(`/api/account/userprofile/${baseUser.pk}/`)
                this.user = user
                await this.getThenLogin(user)
                return user;
            }
            return null
        } catch (error) {
            return null
        }
    }

    public async updateUser(form: any) {
        let res = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`, form)
        if (res.id) {
            await Web.alert('Update profile success.', 'success', 'Update profile success.')
        } else {
            await Web.alert('Update profile fail.', 'error', 'Update profile fail.')
        }
        await this.setUser()
        return res
    }

    public async login(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/auth/v1/login/`, form)
        if (user.key) {
            await this.storeToken(user.key);
            await this.storeTokenToStorage(user.key);
            await this.setUser();
            await location.reload();
            return user
        } else {
            await Web.alertAuto(`Cannot Login`, 2000, `error`, `Username or Password is incorrect`)
        }
        return user
    }

    public async register(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/auth/v2/register/`, form)
        if (user.username) {

        }
        return user
    }

    public async reToken() {
        axios.defaults.headers.common['Authorization'] = '';
    }

    public async storeToken(token: any) {
        // console.log("OK");
        axios.defaults.headers.common['Authorization'] = (token != null) ? `Token ${token}` : '';
    }

    public async storeTokenToStorage(token: any) {
        console.log(this.cookies)
        await this.cookies.set('token', token)
    }

    public async checkToken() {
        if (this.token != null) {
            await this.storeToken(this.token);
        }
    }
    public async checkUser() {
        if (this.token) {
            //  console.log(`TOKEN : ${this.token}`);
            await this.storeToken(this.token);
            let user = await this.getUser();
            if (!user) {
                // alert('Session หมดอายุ di')
                // await Web.alert(`Session หมดอายุ`, `info`,`กรุณา Login ใหม่อีกครั้ง`, )
                await this.reToken();
                await this.logout();
                await location.reload();
            } else {
                await this.setUser()
            }
        }
    }

    public async checkUserLogin() {

        if (this.token) {
            await this.storeToken(this.token);
            let user = await this.getUser();
            console.log(`[AUTH]`, `LOGIN-CHECK`, "INTOKEN");
            if (user) {
                let path = Vue.prototype.$currentPathName()
                if (path == 'auth-login' || path == 'auth-register' || path == 'auth-forgot') {
                    await Vue.prototype.$go(`/`)
                }
            } else {
                await this.logout()
                await location.reload()
            }
        } else {
            console.log(`[AUTH]`, `LOGIN-CHECK`, "NOTOKEN");
            await Vue.prototype.$go(`/auth/login/`)
        }

    }

    public async isLogin() {
        return (this.user) ? true : false
    }

    public async logout() {
        try {
            await this.cookies.keys().forEach((cookie:any) => this.cookies.remove(cookie))
            await Core.postHttp('/api/auth/v1/logout/', {})
            await location.reload()
        } catch (error) {
            await location.reload()
        }

    }

    /**
    * @point Custom Function สำหรับเก็บข้อมูล user ในส่วนอื่นๆ ที่ไม่ใช่ authen หลัก
    */



}

import store from "@/vuexes"
import moment from "moment";
import { AsyncComponent } from "vue";
export const Auth = new AuthModule({ store, name: "Auth" })
