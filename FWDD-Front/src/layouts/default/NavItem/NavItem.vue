<script setup>
import Icon from '../IconSet.vue';

const props = defineProps({ item: Object, level: Number });
// console.log(props);
</script>

<template>
  <!---Single Item-->
  <v-list-item
    :to="item.type === 'external' ? '' : item.to"
    :href="item.type === 'external' ? item.to : ''"
    rounded
    class="customPrepend mb-1"
    color="secondary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <!---If icon-->
    <template v-slot:prepend v-if="props.item.icon.name">
      <Icon :item="props.item.icon" :level="props.level" />
    </template>
    <template v-slot:prepend v-else>
      <v-icon size="20" class="icon">{{ item.icon }}</v-icon>
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
    <!---If any chip or label-->
    <template v-slot:append v-if="item.chip">
      <v-chip
        :color="item.chipColor"
        class="sidebarchip hide-menu"
        :size="item.chipIcon ? 'small' : 'default'"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>

<style scoped>
.customPrepend :deep(.v-list-item__prepend .v-list-item__spacer) {
  width: 0px;
}

.icon {
  opacity: 0.85;
}
</style>

