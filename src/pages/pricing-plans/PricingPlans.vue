<template>
  <div class="flex items-center justify-between w-full mb-[18px]">
    <h1 class="page-title font-bold w-full">Biểu đồ trong chuồng</h1>
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn trong chuồng theo ngày</h1>
      <div ref="chartRef" class="w-full flex items-center h-[400px]">
        <!-- <VaChart :data="chartData" type="bar" :options="options" /> -->
      </div>
    </VaCardContent>
  </VaCard>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn trong chuồng theo tháng</h1>
      <div ref="chartMonthRef" class="w-full flex items-center h-[400px]">
        <!-- <VaChart :data="chartDataMonth" type="bar" :options="options" /> -->
      </div>
    </VaCardContent>
  </VaCard>
</template>
<script setup>
import * as echarts from 'echarts'
import Filter from '../../components/filter/Filter.vue'
import { onMounted, ref } from 'vue'
import { useYearlyStore } from '../../stores/yearlyBreakup'

const storeYearly = useYearlyStore()

let chartRef = ref()
let myChart = ref()

let chartMonthRef = ref()
let myMonthChart = ref()

onMounted(() => {
  myChart.value = echarts.init(chartRef.value)
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        dataView: { readOnly: false },
        magicType: { type: ['bar', 'line'] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: storeYearly.labels,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [
      {
        name: 'Số lượng xuất chuồng',
        type: 'line',
        data: storeYearly.data,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      }
    ],
  }
  myChart.value.setOption(option)

  myMonthChart.value = echarts.init(chartMonthRef.value)
  let optionMonth = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        dataView: { readOnly: false },
        magicType: { type: ['bar', 'line'] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: storeYearly.labels,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [
      {
        name: 'Số lượng xuất chuồng',
        type: 'line',
        data: storeYearly.data,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      }
    ],
  }
  myMonthChart.value.setOption(optionMonth)
})

</script>
