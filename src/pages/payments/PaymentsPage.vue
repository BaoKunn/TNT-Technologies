<template>
  <h1 class="page-title">Biểu đồ xuất nhập</h1>
  <div class="mb-4">
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <div>
        <VaChart :data="chartData" type="bar" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>

  <div class="flex flex-col md:flex-row gap-4">
    <VaCard class="h-[380px] grid grid-cols-1 sm:grid-cols-1">
      <VaCardContent>
        <div class="w-full h-[300px]">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn xuất chuồng theo tháng</h1>
          <VaChart :data="chartData" type="bar" :options="options" />
        </div>
      </VaCardContent>
    </VaCard>
    <VaCard class="h-[380px] grid grid-cols-1 sm:grid-cols-1">
      <VaCardContent>
        <div class="w-full h-[300px]">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn nhập chuồng theo tháng</h1>
          <VaChart :data="chartData" type="bar" :options="options" />
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script lang="ts" setup>
import VaChart from '../../components/va-charts/VaChart.vue'
import { barChartData } from '../../data/charts'
import { useChartData } from '../../data/charts/composables/useChartData'
import { ChartOptions } from 'chart.js'
import Filter from '../../components/filter/Filter.vue'

const date = new Date()
const chartData = useChartData(barChartData)

const options: ChartOptions<'bar'> = {
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
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
}
</script>
