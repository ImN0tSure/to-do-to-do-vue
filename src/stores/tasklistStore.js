import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useTasklistStore = defineStore('tasklistStore', {
    state() {
        return {
            tasklists: [],
            status: 'idle' // idle, loading, success, error
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