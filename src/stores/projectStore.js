import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useRoute} from 'vue-router'

export const useProjectStore = defineStore ('projectStore', {
    state() {
        return {
            projects: null,
            currentProject: '',
            status: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getProjects() {
            this.status = 'loading';

            try {
                const response = await axios.get('/api/project')

                if(response.data.success) {
                    this.projects = response.data.projects
                    this.status = 'success'
                }

            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async storeProject(newProject) {
            this.status = 'loading'

            try {
                const response = await axios.post('/api/project', newProject)

                if(response.data.success) {
                    await this.getProjects()
                    this.status = 'success'
                    console.log(response.data.message)
                    this.router.push('/cabinet')
                } else {
                    this.status = 'error'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        }
    },
    getters: {
        currentProjectKey() {
            if(this.currentProject) {
                {
                    return this.projects.findIndex(item => item.url === this.currentProject)
                }
            }
        }
    }
})