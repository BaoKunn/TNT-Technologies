<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-black text-lg uppercase">Số lượng heo ở các trại</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-col gap-1">
      <div class="flex justify-between">
        <VaButtonToggle v-model="selectedPeriod" :options="periods" color="background-element" size="small" />

        <!-- <VaButton preset="primary" size="small" @click="exportAsCSV"> Export </VaButton> -->
      </div>

      <VaDataTable
        class="region-revenue-table"
        :columns="[
          { key: 'name', label: 'Trạm' },
          { key: 'revenue', label: 'Số lượng' },
        ]"
        :items="data"
      >
        <template #cell(revenue)="{ rowData }"> {{ rowData[`revenue${selectedPeriod}`] }} </template>
      </VaDataTable>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

const selectedPeriod = ref('Today') as Ref<'Today' | 'Week' | 'Month'>
const periods = ['Today', 'Week', 'Month'].map((period) => ({ label: period, value: period }))

const data = [
  {
    name: 'Phổ Yên',
    revenueToday: '100',
    revenueWeek: '8,000',
    revenueMonth: '40,000',
  },
  {
    name: 'Hà Nội',
    revenueToday: '600',
    revenueWeek: '4,000',
    revenueMonth: '25,000',
  },
  {
    name: 'Nghệ An',
    revenueToday: '60',
    revenueWeek: '500',
    revenueMonth: '3,000',
  },
  {
    name: 'Tuyên Quang',
    revenueToday: '200',
    revenueWeek: '1,400',
    revenueMonth: '9,000',
  },
  {
    name: 'Thái Bình',
    revenueToday: '70',
    revenueWeek: '2,000',
    revenueMonth: '10,000',
  },
  {
    name: 'Nam Định',
    revenueToday: '100',
    revenueWeek: '700',
    revenueMonth: '1,400',
  },
  {
    name: 'Hưng Yên',
    revenueToday: '200',
    revenueWeek: '2,400',
    revenueMonth: '20,000',
  },
]
</script>

<style lang="scss" scoped>
.region-revenue-table {
  ::v-deep(tbody) {
    tr {
      border-top: 1px solid var(--va-background-border);
    }
  }
}
</style>
