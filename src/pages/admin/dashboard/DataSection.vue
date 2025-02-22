<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
    <DataSectionItem
      v-for="metric in store.items"
      :key="metric.id"
      :title="metric.title"
      :value="metric.value"
      :change-text="metric.changeText"
      :up="metric.changeDirection === 'up'"
      :icon-background="metric.iconBackground"
      :icon-color="metric.iconColor"
    >
      <template #icon>
        <VaIcon :name="metric.icon" size="medium" />
      </template>
    </DataSectionItem>
  </div>
</template>

<script lang="ts" setup>
import { useDataSection } from '../../../stores/data-section.vue'
import DataSectionItem from './DataSectionItem.vue'
const store = useDataSection()
</script>
