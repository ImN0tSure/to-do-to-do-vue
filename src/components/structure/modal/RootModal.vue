<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import ParticipantModal from "./ParticipantModal.vue";

const modalStore = useModalStore()
</script>

<template>
  <ParticipantModal
    v-if="modalStore.type === 'participant'"
    :participant = modalStore.payload
  />
</template>

<style scoped>

</style>