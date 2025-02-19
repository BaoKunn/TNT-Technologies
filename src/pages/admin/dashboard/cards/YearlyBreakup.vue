<template>
  <VaCard>
    <VaCardTitle>
      <h1 class=" font-bold uppercase text-lg text-black">Số lượng heo chuồng trong tuần</h1>
    </VaCardTitle>
    <VaCardContent>
      <!-- <div class="p-1 bg-black rounded absolute right-4 top-4">
        <VaIcon name="mso-attach_money" color="#fff" size="large" />
      </div> -->
      <!-- <section>
        <div class="text-xl font-bold mb-2">$6,820</div>
        <p class="text-xs text-success">
          <VaIcon name="arrow_upward" />
          25.36%
          <span class="text-secondary"> last month</span>
        </p>
      </section> -->
      <div class="w-full flex items-center h-[200px]">
        <VaChart :data="chartData" class="h-32" type="line" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard } from 'vuestic-ui'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { useChartData } from '../../../../data/charts/composables/useChartData'
import { ChartOptions } from 'chart.js'
import { lineChartDataTotal } from '../../../../data/charts/lineChartData copy'

const chartData = useChartData(lineChartDataTotal)

const options: ChartOptions<'line'> = {
  scales: {
    x: {
      display: true,
      grid: {
        display: true, // Disable X-axis grid lines ("net")
      },
    },
    y: {
      display: true,
      grid: {
        display: true, // Disable Y-axis grid lines ("net")
      },
      ticks: {
        display: true, // Hide Y-axis values
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
    },
  },
}
</script>
