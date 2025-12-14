<script setup>

import AppHeader from "./components/structure/AppHeader.vue";
import AppFooter from "./components/structure/AppFooter.vue";
import {useAuthStore} from "./stores/authStore.js";

const authStore = useAuthStore()
</script>

<template>
  <AppHeader/>

  <RouterView v-if="authStore.isAuthResolved"/>
  <main class="main" v-else>
    <VueSpinner size="l" color="#000"/>
  </main>


  <AppFooter/>
</template>

<style scoped>
.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
}
</style>
