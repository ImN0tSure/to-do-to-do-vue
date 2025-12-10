<script setup>
import {useProjectStore} from "../../stores/projectStore.js";
import {useParticipantStore} from "../../stores/participantStore.js";
import {ref, onMounted, computed} from 'vue'
import ParticipantPreview from "./ParticipantPreview.vue";
import VueSpinner from "../structure/VueSpinner.vue";
import BaseButton from "../structure/BaseButton.vue";

const projectStore = useProjectStore()
const participantStore = useParticipantStore()

onMounted(() => {
  participantStore.getParticipants()
})

const projectDescription = computed(() => {
  return projectStore.projects[projectStore.currentProjectKey].description
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
        v-if="participantStore.status === 'loading'"
    />
    <div class="participants"  v-if="participantStore.status === 'success'">
      <ParticipantPreview
        v-for="participant in participantStore.participants"
        :name="participant.name"
        :surname="participant.surname"
        :img="participant.avatar_img"
        :status="participant.pivot.status"
      />
    </div>
    <p v-if="participantStore.status === 'error'">
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