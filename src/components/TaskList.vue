<script setup>
import TaskListRow from "./TaskListRow.vue";
import {ref, computed, defineProps} from 'vue'
import TaskListRowHeader from "./TaskListRowHeader.vue";

const props = defineProps({
  header: {
    type: String,
    default: 'Задачи на сегодня'
  },
  tasks: {
    type: Array,
    default: []
  }
})

const listOpened = ref(true)

const toggleListDisplay = () => {
  listOpened.value = !listOpened.value
}
const listArrow = computed(() => {
  return listOpened.value ? '▲' : '▼'
})

</script>

<template>
<div class="task-list">
  <div class="task-list__header" @click="toggleListDisplay()">
    <h2>{{ header }}</h2>
    <span class="toggle-arrow">{{ listArrow }}</span>
  </div>
  <div class="tasks" v-show="listOpened">
    <TaskListRowHeader/>
    <TaskListRow
      v-for="task in tasks"
      :name="task.name"
      :in-progress="!!task.inProgress"
      :priority="task.priority"
      :time="task.time"
      :id="task.id"
      :project-url="task.projectUrl"
    />
  </div>
</div>
</template>

<style lang=scss>
.task-list {
  margin-bottom: 20px;

  &__header {
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    background: #f06292;
    padding: 20px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(240, 98, 146, 0.2);
    font-size: 1.5em;
    font-weight: 600;
    color: #fff;
    transition: background 0.3s ease;
    margin-bottom: 20px;
  }
}

.tasks {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  text-align: center;

  &__row {
    display: flex;
    border-radius: 25px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 4px #d83979;
    font-weight: 600;
    align-items: center;
  }
}

.name {
  flex-basis: 55%;
  text-align: left;
}

.status, .priority, .time {
  flex-basis: 19%;
}

.toggle-arrow {
  font-size: 1.2em;
  transition: transform 0.3s ease;
  cursor: pointer;
}

</style>