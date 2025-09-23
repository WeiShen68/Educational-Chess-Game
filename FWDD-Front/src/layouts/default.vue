<template>
  <v-locale-provider>
    <v-app :class="customizer.mini_sidebar ? 'mini-sidebar' : ''">
      <DefaultDrawer />
      <DefaultBar />
      <DefaultView />
    </v-app>
  </v-locale-provider>
</template>

<script setup>
  import DefaultDrawer from './default/Drawer.vue'
  import DefaultBar from './default/AppBar.vue'
  import DefaultView from './default/View.vue'
  import { useCustomizerStore } from '@/store/customizer.js';
  const customizer = useCustomizerStore();
</script>
