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
        async getProject(url) {
            console.log('/api/project/' + url)
        }
    }
})