<script setup>
import {useProjectsStore} from "../stores/projectsStore.js";
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";
import BaseButton from "../components/structure/BaseButton.vue";
import MainTab from "../components/ProjectPage/MainTab.vue";
import TasksTab from "../components/ProjectPage/TasksTab.vue";

const route = useRoute()
const projectsStore = useProjectsStore()
const currentTab = ref('tasks')

const switchTab = (tab) => {
  currentTab.value = tab
}

onMounted(() => {
  checkCurrentProject()
})

const checkCurrentProject = () => {
  if (!projectsStore.currentProject) {
    projectsStore.currentProject = route.params.url
  }
}
</script>

<template>
  <section class="content">
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
        />
      </div>
    </div>
    <MainTab
        v-if="currentTab === 'main'"
        :key="projectsStore.currentProject"
    />
    <TasksTab
        v-if="currentTab === 'tasks'"
        :key="projectsStore.currentProject"
    />
  </section>
</template>

<style lang=scss scoped>
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