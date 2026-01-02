<script setup>
import {useTaskStore} from "../stores/taskStore.js";
import {computed, onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {useProjectStore} from "../stores/projectStore.js";
import {useTasklistStore} from "../stores/tasklistStore.js";
import {useParticipantStore} from "../stores/participantStore.js";
import EditableInput from "../components/structure/EditableInput.vue";
import VueSpinner from "../components/structure/VueSpinner.vue";
import EditableBaseSelectInput from "../components/structure/EditableBaseSelectInput.vue";
import EditableTextarea from "../components/structure/EditableTextarea.vue";
import BaseButton from "../components/structure/BaseButton.vue";

const route = useRoute()
const projectStore = useProjectStore()
const participantStore = useParticipantStore()
const tasklistStore = useTasklistStore()
const taskStore = useTaskStore()


const executorOptions = computed(() => {
  const data = {}
  if(participantStore?.participants?.length > 0) {
    participantStore.participants.forEach(({name, surname, user_id}) => {
      data[user_id] = `${name} ${surname}`
    })
  }
  return data
})

const tasklistOptions = computed(() => {
  const data = {}
  if(tasklistStore?.tasklists?.length > 0) {
    tasklistStore.tasklists.forEach(({id, name}) => {
      data[id] = name
    })
  }
  return data
})

const priorityOptions = taskStore.priorities
const inProgressOptions = taskStore.inProgress

const saveTask = () => {
  taskStore.saveCurrentTask()
}

onMounted(async () => {
  const projectUrl = route.params.url
  const taskId = route.params.taskId
  projectStore.currentProject = projectUrl

  try {
    await Promise.all([
      taskStore.getTask(projectUrl, taskId),
      tasklistStore.getTasklists(),
      participantStore.getParticipants()
    ])

  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <VueSpinner v-if="taskStore.status === 'loading'"/>
  <div v-else-if="taskStore.status === 'success'">
    <h2 class="header">Задача</h2>
    <EditableInput
        label="Задача"
        v-model="taskStore.currentTask.name"
    />
    <EditableTextarea
      label="Описание"
      v-model="taskStore.currentTask.description"
    />
    <EditableBaseSelectInput
      label="Исполнитель"
      v-model="taskStore.currentTask.executor_id"
      :options="executorOptions"
    />
    <EditableBaseSelectInput
        label="Текущий список"
        v-model="taskStore.currentTask.tasklist_id"
        :options="tasklistOptions"
        :with-nullable="false"
    />
    <EditableInput
      label="Дата окончания"
      type="date"
      v-model="taskStore.currentTask.end_date"
      :is-editable=true
      class="date-time"
    />
    <EditableInput
        label="Время окончания"
        type="time"
        v-model="taskStore.currentTask.end_time"
        :is-editable=true
        class="date-time"
    />
    <EditableBaseSelectInput
      label="Приоритет"
      v-model="taskStore.currentTask.priority"
      :options="priorityOptions"
      :with-nullable=false
    />
    <EditableBaseSelectInput
        label="Статус"
        v-model="taskStore.currentTask.in_progress"
        :options="inProgressOptions"
        :with-nullable=false
    />
    <BaseButton
        size="m"
        text="Сохранить"
        @click.prevent.stop="saveTask"
        class="date-time"
    />
  </div>
  <div v-else-if="taskStore.status === 'error'">
    Ошибка загрузки. Смотрите консоль.
  </div>

</template>

<style lang=scss scoped>
.header {
  margin-top: 0;
  font-size: 2em;
  color: #9e1b56;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px #d83979;
}

.date-time {
  width: 20%;
}
</style>