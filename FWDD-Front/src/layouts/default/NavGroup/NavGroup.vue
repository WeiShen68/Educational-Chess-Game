<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <v-list-item prepend-icon="mdi-circle-medium" color="darkText" class="smallCap">{{ props.item.header }}</v-list-item>
</template>
