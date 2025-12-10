import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useTaskStore = defineStore('taskStore', {
    state() {
        return {
            tasks: [],
            status: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getTasks() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/tasks')
                this.tasks = response.data.tasks
                this.status = 'success'
                console.log(response.data)
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getTasksForToday() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/tasks-for-today')
                if (response.data.success) {
                    this.tasks = response.data.tasks
                    this.status = 'success'
                }
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
        },
        tasksByList: (state) => {
            return (listId) => state.tasks?.filter(t => t.tasklist_id === listId) || []
        }
    }
})