<script setup>
import {useTasklistStore} from "../../stores/tasklistStore.js";
import {onMounted, ref} from "vue";
import VueSpinner from "../structure/VueSpinner.vue";
import TaskList from "../TaskList.vue";
import {useTaskStore} from "../../stores/taskStore.js";

const tasklistStore = useTasklistStore()
const taskStore = useTaskStore()
const dataLoaded = ref(false)


onMounted(async () => {

  try {
    await Promise.all([
      taskStore.getTasks(),
      tasklistStore.getTasklists()
    ])
    dataLoaded.value = true
  } catch (e) {
    console.error(e)
  }

})
</script>

<template>
  <VueSpinner v-if="tasklistStore.status === 'loading'"/>
  <div v-if="tasklistStore.status === 'success'">
    <TaskList
        v-for="tasklist in tasklistStore.tasklists"
        :header="tasklist.name"
        :tasks="taskStore.tasksByList(tasklist.id)"
    />
  </div>
</template>

<style scoped>

</style>