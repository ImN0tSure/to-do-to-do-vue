import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useTasklistStore = defineStore('tasklistStore', {
    state() {
        return {
            tasklists: [],
            newTasklist: {
                name: '',
                description: ''
            },
            status: 'idle', // idle, loading, success, error
            createTasklistStatus: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getTasklists() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/tasklists')
                this.tasklists = response.data.tasklists
                this.status = 'success'
                console.log(response.data)
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async createTasklist() {
            if(this.newTasklist.name.length > 0) {
                this.createTasklistStatus = 'loading'
                try {
                    const targetUrl = `/api/project/${this.currentProject}/tasklists`

                    const response = await axios.post(targetUrl, this.newTasklist)

                    if(response.data.success) {
                        this.tasklists.push(response.data.tasklist)
                        this.createTasklistStatus = 'success'
                        console.log(response.data)
                        return {success: true}
                    } else {
                        this.createTasklistStatus = 'error'
                        console.log(response.data)
                        return {success: false}
                    }
                } catch (e) {
                    this.createTasklistStatus = 'error'
                    console.log(e.response?.data?.message)
                    return {success: false}
                }
            }
        }
    },
    getters: {
        currentProject() {
            const projectStore = useProjectStore()

            if(projectStore.currentProject.length > 0) {
                return projectStore.currentProject
            } else {
                return ''
            }
        }
    }
})