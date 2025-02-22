<template>
  <h1 class="page-title">Biểu đồ xuất nhập</h1>
  <div class="mb-4">
    <label for="local">Khu vực: </label>
    <select id="local" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" placeholder="Chọn khu vực">
      <option value="Miền Bắc">Miền Bắc</option>
      <option value="Miền Trung">Miền Trung</option>
    </select>
    <label for="city">Thành phố/Tỉnh: </label>
    <select id="city" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="" placeholder="Chọn khu vực">
      <option value="Hà Nội">Hà Nội</option>
      <option value="Thái Nguyên">Thái Nguyên</option>
    </select>
    <label for="farm">Trang trại: </label>
    <select id="farm" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" placeholder="Chọn khu vực">
      <option value="Farm 1">Farm 1</option>
      <option value="Farm 2">Farm 2</option>
    </select>
    <label for="time">Thời gian: </label>
    <VaDateInput id="time" v-model="date" class="mr-2 w-[140px] rounded-[10px]" />
    <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm<VaIcon name="vasearch" /></VaButton>
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
import { VaDateInput, VaIcon } from 'vuestic-ui'
import VaChart from '../../components/va-charts/VaChart.vue'
import { barChartData } from '../../data/charts'
import { useChartData } from '../../data/charts/composables/useChartData'
import { ChartOptions } from 'chart.js'

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
