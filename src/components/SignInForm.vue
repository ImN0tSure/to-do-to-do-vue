<script setup>
import BaseInput from "./BaseInput.vue";
import {ref, computed} from "vue";
import {useAuthStore} from "../stores/authStore.js";

const authStore = useAuthStore()
const sendForm = () => {
  const userData = {
    email: email.value,
    password: password.value
  }

  authorizeUser(userData)
}

const tmpLogout = () => {
  authStore.logout()
}

const authorizeUser = (userData) => {
  authStore.login(userData)
}

const isButtonDisabled = computed(() => {
  const emailLength = email.value.length
  const passwordLength = password.value.length

  return !emailLength || !passwordLength
})

const email = ref('')
const password = ref('')



</script>

<template>
<form>
  <BaseInput
    type="email"
    name="email"
    placeholder="Электронная почта"
    v-model="email"
  />
  <BaseInput
    type="password"
    name="password"
    placeholder="Пароль"
    v-model="password"
  />
  <BaseButton
    size="l"
    text="Войти"
    @click.prevent.stop="sendForm"
    :is-disabled="isButtonDisabled"
  />
</form>
</template>

<style lang=scss scoped>

</style>