import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useParticipantStore = defineStore('participantStore' , {
    state() {
        return {
            participants: {},
            selectedParticipant: {},
            participantsLoading: 'idle', // idle, loading, success, error
            participantLoading: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getParticipants() {
            this.participantsLoading = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/participants')
                this.participants = response.data.participants
                this.participantsLoading = 'success'
            } catch (e) {
                this.participantsLoading = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getParticipant(userId) {
            this.participantLoading = 'loading'

            const targetUrl = `/api/project/${this.currentProject}/participants/${userId}`

            try {
                const response = await axios.get(targetUrl)

                if(response.data.success) {
                    this.selectedParticipant = response.data.participant
                    this.participantLoading = 'success'
                } else {
                    this.participantLoading = 'error'
                    console.log(response.data.message)
                }
            } catch (e) {
                this.participantLoading = 'error'
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