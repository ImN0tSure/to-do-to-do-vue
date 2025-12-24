<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import ParticipantModal from "./ParticipantModal.vue";
import AddTasklistModal from "./AddTasklistModal.vue";
import RedactTasklistModal from "./RedactTasklistModal.vue";

const modalStore = useModalStore()
</script>

<template>
  <ParticipantModal
    v-if="modalStore.type === 'participant'"
    :participant = modalStore.payload
  />
  <AddTasklistModal
    v-if="modalStore.type === 'addTasklist'"
    :add-tasklist = modalStore.payload
  />
  <RedactTasklistModal
    v-if="modalStore.type === 'redactTasklist'"
    :redact-tasklist = modalStore.payload
  />
</template>

<style scoped>

</style>