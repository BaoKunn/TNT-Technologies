<template>
  <VaCard>
    <VaCardTitle class="pb-0!">
      <h1 class="card-title text-lg text-black uppercase">Số lượng lợn trả lại</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-row gap-1">
      <div ref="chartRef" class="w-full h-[400px]"></div>
      <!-- Chart container -->
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { VaCard } from 'vuestic-ui'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartRef = ref() // Reference for the chart container
let myChart = ref()

const current = new Date()
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // Shadow type tooltip for bar charts
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320],
    },
  ],
}

onMounted(() => {
  // Ensure the chart container is available before initializing
  myChart.value = echarts.init(chartRef.value)
  const option = {
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Cổng 1' },
          { value: 735, name: 'Cổng 2' },
          { value: 580, name: 'Cổng 3' },
          { value: 484, name: 'Cổng 4' },
          { value: 300, name: 'Cổng 5' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  myChart.value.setOption(option)
})
</script>
