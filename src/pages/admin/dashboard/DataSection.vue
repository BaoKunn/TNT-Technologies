<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
    <DataSectionItem
      v-for="metric in dashboardMetrics"
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
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'
import DataSectionItem from './DataSectionItem.vue'

interface DashboardMetric {
  id: string
  title: string
  value: string
  icon: string
  changeText: string
  changeDirection: 'up' | 'down'
  iconBackground: string
  iconColor: string
}

const { getColor } = useColors()

const dashboardMetrics = computed<DashboardMetric[]>(() => [
  {
    id: 'openInvoices',
    title: 'Xuất chuồng',
    value: '519',
    icon: 'mso-attach_money',
    changeText: '$1, 450',
    changeDirection: 'down',
    iconBackground: getColor('danger'),
    iconColor: getColor('on-danger'),
  },
  {
    id: 'ongoingProjects',
    title: 'Nhập chuồng',
    value: '4913',
    icon: 'mso-folder_open',
    changeText: '25.36%',
    changeDirection: 'up',
    iconBackground: getColor('info'),
    iconColor: getColor('on-info'),
  },
  {
    id: 'employee',
    title: 'Nhập trả lại',
    value: '244',
    icon: 'mso-account_circle',
    changeText: '2.5%',
    changeDirection: 'up',
    iconBackground: getColor('warning'),
    iconColor: getColor('on-warning'),
  },
  {
    id: 'employees',
    title: 'Trong chuồng',
    value: '76',
    icon: 'mso-account_circle',
    changeText: '2.5%',
    changeDirection: 'up',
    iconBackground: getColor('success'),
    iconColor: getColor('on-success'),
  },
])
</script>
