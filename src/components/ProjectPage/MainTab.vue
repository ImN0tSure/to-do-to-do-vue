<script setup>
import {useProjectsStore} from "../../stores/projectsStore.js";
import {useParticipantsStore} from "../../stores/participantsStore.js";
import {ref, onMounted, computed} from 'vue'
import ParticipantPreview from "./ParticipantPreview.vue";
import VueSpinner from "../structure/VueSpinner.vue";
import BaseButton from "../structure/BaseButton.vue";

const projectsStore = useProjectsStore()
const participantsStore = useParticipantsStore()

onMounted(() => {
  participantsStore.getParticipants()
})

const projectDescription = computed(() => {
  return projectsStore.projects[projectsStore.currentProjectKey].description
})

</script>

<template>

  <div class="section">
    <h2>О проекте</h2>
    <p>
      {{ projectDescription }}
    </p>
  </div>
  <div class="section">
    <h2>Участники</h2>
    <VueSpinner
        v-if="participantsStore.status === 'loading'"
    />
    <div class="participants"  v-if="participantsStore.status === 'success'">
      <ParticipantPreview
        v-for="participant in participantsStore.participants"
        :name="participant.name"
        :surname="participant.surname"
        :img="participant.avatar_img"
        :status="participant.pivot.status"
      />
    </div>
    <p v-if="participantsStore.status === 'error'">
      Ошибка загрузки. Смотри консоль.
    </p>
  </div>
  <div class="section control-buttons">
    <BaseButton
      text="Добавить участника"
    />
    <BaseButton
        text="Исключить участников"
    />
    <BaseButton
        text="Покинуть проект"
    />
  </div>

</template>

<style scoped>
.section {
  margin-bottom: 20px;
}

.participants {
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
  gap: 10px;
}

.control-buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>