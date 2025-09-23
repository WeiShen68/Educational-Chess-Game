<template>
  <v-app-bar elevation="0" height="80">
    <v-btn
      class="hidden-md-and-down text-secondary"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-app-bar-title><v-img style="width: auto; height: 100px" src="@/assets/chesslogo.png" alt="Icon"></v-img></v-app-bar-title>
    <template v-slot:append>
      <v-btn
        class="hidden-md-and-down text-secondary"
        icon
        rounded="sm"
        variant="flat"
        color="lightsecondary"
        size="small"
        @click="logout"
      >
        <LogoutIcon size="20" stroke-width="1.5" />
      </v-btn>
      <v-btn
        class="hidden-lg-and-up text-secondary ms-3"
        icon
        rounded="sm"
        variant="flat"
        color="lightsecondary"
        size="small"
        @click="logout" 
      >
        <LogoutIcon size="20" stroke-width="1.5"/>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useCustomizerStore } from '@/store/customizer.js';
import { Menu2Icon, LogoutIcon } from 'vue-tabler-icons';
import { login } from '@/store/login';

const customizer = useCustomizerStore();
const loginStore = login();

const logout = async () => {
  console.log('logout');
  await loginStore.logout_act();
};
</script>
