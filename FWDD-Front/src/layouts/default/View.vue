<template>
  <v-main>
    <v-container fluid class="page-wrapper">
      <div>
        <RouterView />
      </div>
    </v-container>
  </v-main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped>
.page-wrapper {
  min-height: calc(100vh - 100px);
  padding: 15px;
  border-radius: 12px;
  background: #eef2f6;
}
</style>
