import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useParticipantStore = defineStore('participantStore' , {
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
            const projectStore = useProjectStore()

            if(projectStore.currentProject.length > 0) {
                return projectStore.currentProject
            } else {
                return ''
            }
        }
    }
})