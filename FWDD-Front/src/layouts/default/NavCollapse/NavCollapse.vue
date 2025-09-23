<script setup>
import NavItem from '../NavItem/NavItem.vue';
import Icon from '../IconSet.vue';

const props = defineProps({ item: Object, level: Number });
// console.log(props);
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Item Childern -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :value="item.title" rounded class="customPrepend mb-1" color="secondary">
        <!---Icon  -->
        <template v-slot:prepend v-if="item.icon.name">
          <Icon :item="item.icon" :level="level" />
        </template>
        <template v-slot:prepend v-else>
          <v-icon size="20" class="icon">{{ item.icon }}</v-icon>
        </template>
        <!---Title  -->
        <v-list-item-title class="mr-auto">{{ item.title }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
          {{ item.subCaption }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in item.children" :key="i">
      <NavCollapse :item="subitem" v-if="subitem.children" :level="props.level + 1" />
      <NavItem :item="subitem" :level="props.level + 1" v-else></NavItem>
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>

<style scoped>
.customPrepend :deep(.v-list-item__prepend .v-list-item__spacer) {
  width: 0px;
}

.icon {
  opacity: 0.85;
}
</style>
