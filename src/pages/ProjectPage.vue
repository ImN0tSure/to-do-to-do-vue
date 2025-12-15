<script setup>
import {useProjectStore} from "../stores/projectStore.js";
import {ref} from "vue";
import BaseButton from "../components/structure/BaseButton.vue";
import MainTab from "../components/ProjectPage/MainTab.vue";
import TasksTab from "../components/ProjectPage/TasksTab.vue";
import {useRoute} from 'vue-router'
import router from "../router/index.js";

const projectStore = useProjectStore()
const currentTab = ref('tasks')
const route = useRoute()
const switchTab = (tab) => {
  currentTab.value = tab
}

const toCreateTaskPage = () => {
  const projectUrl = route.params.url
  router.push(`/cabinet/project/${projectUrl}/tasks/create`)
}
</script>

<template>

  <div class="content-header">
    <div class="content-header__tabs">
      <div
          class="tab"
          :class="{active: currentTab === 'main'}"
          @click="switchTab('main')"
      >Главная
      </div>
      <div
          class="tab"
          :class="{active: currentTab === 'tasks'}"
          @click="switchTab('tasks')"
      >Задачи
      </div>
    </div>
    <div class="content-header__buttons">
      <BaseButton
          text="Добавить список"
      />
      <BaseButton
          text="Добавить задачу"
          @click="toCreateTaskPage"
      />
    </div>
  </div>
  <MainTab
      v-if="currentTab === 'main'"
      :key="projectStore.currentProject"
  />
  <TasksTab
      v-if="currentTab === 'tasks'"
      :key="projectStore.currentProject"
  />

</template>

<style lang=scss scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #d83979;

  &__tabs {
    display: flex;

    & .tab {
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;
      color: #9e1b56;
      background: #ffd0e0;
      border: 1px solid #d83979;
      border-radius: 20px 20px 0 0;
      transition: background-color 0.3s ease;
    }

    & .active {
      background: #f06292;
      color: white;
    }

  }

  &__buttons {
    display: flex;
    gap: 10px;
  }
}
</style>