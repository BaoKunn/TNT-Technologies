<template>
  <VaCard>
    <VaCardTitle class="pb-0!">
      <h1 class="card-title text-lg text-black uppercase">Số lượng lợn trong các chuồng</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-row gap-1">
      <!-- <section class="w-1/2">
        <div class="text-xl font-bold mb-2">$36,358</div>
        <p class="text-xs text-success whitespace-nowrap">
          <VaIcon name="arrow_outward" />
          +2,5%
          <span class="text-secondary"> last year</span>
        </p>
        <div class="my-4 gap-2 flex flex-col">
          <div class="flex items-center">
            <span class="inline-block w-2 h-2 mr-2" :style="{ backgroundColor: earningsBackground }"></span>
            <span class="text-secondary">Earnings</span>
          </div>
          <div class="flex items-center">
            <span class="inline-block w-2 h-2 mr-2" :style="{ backgroundColor: profitBackground }"></span>
            <span class="text-secondary">Profit</span>
          </div>
        </div>
      </section> -->
      <div class="w-1/2 flex items-center h-[500px] flex-1 lg:pl-16 pl-2 -mr-1">
        <VaChart :data="data" type="pie" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VaCard } from 'vuestic-ui'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { useChartData } from '../../../../data/charts/composables/useChartData'
import { ChartOptions } from 'chart.js'
let delayed: boolean
const current = new Date()
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
const data = {
  labels: ['Chuồng 1', 'Chuồng 2', 'Chuồng 3'],
  datasets: [
    {
      label: 'Số lượng',
      backgroundColor: ['#e63946', '#326998', '#ffbe0b'],
      data: [10, 30, 20],
    },
  ],
}

const options: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `Ngày: ${date}`,
    },
  },
  animation: {
    onComplete: () => {
      delayed = true
    },
    delay: (context) => {
      let delay = 0
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100
      }
      return delay
    },
  },
}
</script>
