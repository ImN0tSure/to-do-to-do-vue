<script setup>
import TaskList from "../components/TaskList.vue"
import axios from "../api/axios.js"
import {ref, onMounted} from 'vue'
import VueSpinner from "../components/structure/VueSpinner.vue";

const tasks = ref({})
const requestStatus = ref('idle') // idle, loading, success, error
const getTasksForToday = async () => {
  requestStatus.value = 'loading'
  try {
    const response = await axios.get('/api/tasks-for-today')
    if (response.data.success) {
      tasks.value = response.data.tasks
      requestStatus.value = 'success'
    }
  } catch(e) {
    requestStatus.value = 'error'
    console.log(e.response?.data?.message)
  }
}

onMounted(() => {
  getTasksForToday()
})

</script>

<template>
  <section class="content">
    <VueSpinner size="l" v-if="requestStatus === 'loading'"/>
    <div v-if="requestStatus === 'success'">
      <TaskList
          v-if="tasks.length > 0"
          :tasks="tasks"
      />
      <p v-else>Задач на сегодня нет</p>
    </div>
    <div v-if="requestStatus === 'error'">Ошибка загрузки. Смотрите консоль.</div>
  </section>
</template>

<style scoped>
.content {
  flex-grow: 1;
  background: #ffd0e0;
  border-radius: 40px;
  padding: 40px 50px;
  box-shadow: 0 6px 20px rgba(240, 98, 146, 0.35);
  display: flex;
  flex-direction: column;
  width: 82%;
}

</style>