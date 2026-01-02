<script setup>
import {useProjectStore} from "../../stores/projectStore.js";
import {useParticipantStore} from "../../stores/participantStore.js";
import {computed, onMounted} from 'vue'
import ParticipantPreview from "./ParticipantPreview.vue";
import VueSpinner from "../structure/VueSpinner.vue";
import BaseButton from "../structure/BaseButton.vue";
import {useModalStore} from "../../stores/modalStore.js";

const modalStore = useModalStore()
const projectStore = useProjectStore()
const participantStore = useParticipantStore()

onMounted(() => {
  participantStore.getParticipants()
})

const projectDescription = computed(() => {
  return projectStore.projects[projectStore.currentProjectKey].description
})

const showParticipantInfo = (id) => {
  participantStore.getParticipant(id)
  modalStore.open('participant', {userId: id})
}

const openAddParticipantModal = () => {
  modalStore.open('addParticipant')
}

const openExcludeParticipantModal = () => {
  modalStore.open('excludeParticipant')
}

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
        v-if="participantStore.participantsLoading === 'loading'"
    />
    <div class="participants" v-if="participantStore.participantsLoading === 'success'">
      <ParticipantPreview
          v-for="participant in participantStore.participants"
          :key="participant.user_id"
          :name="participant.name"
          :surname="participant.surname"
          :img="participant.avatar_img"
          :status="participant.pivot.status"
          @click="showParticipantInfo(participant.user_id)"
      />
    </div>
    <p v-if="participantStore.participantsLoading === 'error'">
      Ошибка загрузки. Смотри консоль.
    </p>
  </div>
  <div class="section control-buttons">
    <BaseButton
        text="Добавить участника"
        @click="openAddParticipantModal"
    />
    <BaseButton
        text="Исключить участников"
        @click="openExcludeParticipantModal"
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