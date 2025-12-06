import {defineStore} from 'pinia'
import axios from "../api/axios.js"

export const useAuthStore = defineStore('authStore', {
    state() {
        return {
            user: null,
            isLoggedIn: false,
            isAuthResolved: false,
        }
    },
    actions: {
        async login(userData) {
            console.log(userData)
            try {
                await axios.get('/sanctum/csrf-cookie')
                const response = await axios.post('/authorize', userData)

                if (response.data.success) {
                    this.user = response.data.user
                    this.isLoggedIn = true
                    this.router.push('/cabinet')
                }

                console.log(response.data)
            } catch(e) {
                console.log(e.response.data)
            }
        },

        async logout() {
            try {
                const response = await axios.get('/logout')
                this.isLoggedIn = false
                this.router.push('/login')
                console.log(response.data)
            } catch (e) {
                console.log(e.message)
            }

        },

        isAuth() {
            return !!this.isLoggedIn
        },

        async restoreAuth() {
            try {
                const { data } = await axios.get('api/user')
                this.user = data
                this.isLoggedIn = true
            } catch {
                this.user = null
                this.isLoggedIn = false
            } finally {
                this.isAuthResolved = true
            }
        }
    }
})