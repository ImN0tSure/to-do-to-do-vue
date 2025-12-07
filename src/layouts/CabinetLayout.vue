<script setup>

import CabinetAside from "../components/CabinetAside.vue";

</script>

<template>
  <main class="cabinet">
    <CabinetAside/>
    <RouterView />
  </main>
</template>

<style scoped>
.cabinet {
  flex-grow: 1;
  display: flex;
  padding: 40px 60px;
  gap: 30px;
  background: #fff0f6;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 10px 30px rgba(240, 98, 146, 0.3);
  user-select: none;
}
</style>