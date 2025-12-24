<script setup>
import {computed, defineProps, ref} from 'vue'
import {useTasklistStore} from "../../../stores/tasklistStore.js";
import BaseModal from "./BaseModal.vue";
import {useModalStore} from "../../../stores/modalStore.js";
import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import VueSpinner from "../VueSpinner.vue";


const modalStore = useModalStore()
const tasklistStore = useTasklistStore()

const close = () => {
  modalStore.close()
}

const saveNewTasklistName = async () => {
  const result = await tasklistStore.redactTasklist(modalStore.payload)

  if(result) {
    close()
  }
}

</script>

<template>
  <BaseModal @close="close">
    <section class="redact-tasklist">
      <h3>Изменить название списка</h3>
      <BaseInput
          :with-label="true"
          label="Название списка"
          name="name"
          placeholder="Введите новое название"
          class="redact-tasklist-input"
          size="s"
          v-model="modalStore.payload.name"
      />
      <BaseButton
          v-if="tasklistStore.changeTasklistStatus !== 'loading'"
          text="Сохранить"
          @click="saveNewTasklistName"
      />
      <VueSpinner v-else-if="tasklistStore.changeTasklistStatus === 'loading'"/>
    </section>
  </BaseModal>
</template>

<style scoped>
.redact-tasklist {
  background: #fff0f6;
  padding: 25px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(240, 98, 146, 0.4);
  width: 350px;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.3s ease;
}

h3 {
  margin: 0 0 10px;
  color: #9e1b56;
  text-align: center;
}
</style>