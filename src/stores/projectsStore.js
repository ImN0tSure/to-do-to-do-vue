import {defineStore} from 'pinia'
import axios from "../api/axios.js"

export const useProjectsStore = defineStore ('projectsStore', {
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
                const response = await axios.get('/api/projects')

                if(response.data.success) {
                    this.projects = response.data.projects
                    this.status = 'success'
                }

            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getProject() {

        },
    },
    getters: {
        currentProjectKey() {
            if(this.currentProject.length > 0) {
                {
                    return this.projects.findIndex(item => item.url === this.currentProject)
                }
            }
        }
    }
})