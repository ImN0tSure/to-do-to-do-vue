import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectsStore} from "./projectsStore.js";

export const useParticipantsStore = defineStore('participantsStore' , {
    state() {
        return {
            participants: {},
            status: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getParticipants() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/participants')
                this.participants = response.data.participants
                this.status = 'success'
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        }
    },
    getters: {
        currentProject() {
            const projectsStore = useProjectsStore()

            if(projectsStore.currentProject.length > 0) {
                return projectsStore.currentProject
            } else {
                return ''
            }
        }
    }
})