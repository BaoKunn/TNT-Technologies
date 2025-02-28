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
      <div>
        <VaChart :data="chartDataMonth" type="bar" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
</template>
<script setup>
import VaChart from '../../components/va-charts/VaChart.vue'
import * as echarts from 'echarts'
import Filter from '../../components/filter/Filter.vue'
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { useYearlyStore } from '../../stores/yearlyBreakup'
import { useDatePickerStore } from '../../stores/datePicker'

const options = {
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

const storeYearly = useYearlyStore()
const storeDatePicker = useDatePickerStore()

let chartRef = ref()
let myChart = ref()

const chartData = reactive({
  labels: storeYearly.labels,
  datasets: [
    {
      label: 'Xuất chuồng',
      data: storeYearly.data,
      backgroundColor: ['#3333FF'],
    },
  ],
})

const chartDataMonth = reactive({
  labels: storeYearly.labels,
  datasets: [
    {
      label: 'Xuất chuồng',
      data: storeYearly.dataMonth,
      backgroundColor: ['#00CC00'],
    },
  ],
})

onMounted(() => {
  // Promise.all([
  //   axios.get(
  //     `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`,
  //   ),
  //   axios.get(
  //     `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`,
  //   ),
  //   axios.get(
  //     `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`,
  //   ),
  // ]).then(([datesResponse, countResponse, countMonthponse]) => {
  //   storeYearly.setLabels(datesResponse.data)
  //   storeYearly.setData(countResponse.data[0].ListCount)
  //   storeYearly.setDataMonth(countMonthponse.data[0].ListCount)
  // })
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
})

</script>
