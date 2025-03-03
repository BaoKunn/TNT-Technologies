<template>
  <div class="flex items-center justify-between w-full mb-[18px]">
    <h1 class="page-title font-bold w-full">Biểu đồ xuất nhập</h1>
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <div ref="chartRef" class="w-full flex items-center h-[400px]">
        <!-- <VaChart :data="chartData" type="bar" :options="options" /> -->
      </div>
    </VaCardContent>
  </VaCard>

  <div class="flex space-x-4">
    <VaCard class="w-1/2">
      <VaCardContent>
        <div class="w-full">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn nhập chuồng theo tháng</h1>
          <div ref="chartInRef" class="w-full h-[400px]"></div>
          <!-- <VaChart :data="chartDataInMonth" type="bar" :options="options" /> -->
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard class="w-1/2">
      <VaCardContent>
        <div class="w-full h-[300px]">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn xuất chuồng theo tháng</h1>
          <div ref="chartOutRef" class="w-full h-[400px]"></div>
          <!-- <VaChart :data="chartDataOutMonth" type="bar" :options="options" /> -->
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup>
import Filter from '../../components/filter/Filter.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'
import { useGlobalStore } from '../../stores/global-store'
import { useMonthStore } from '../../stores/monthlyEaring'
import { useDatePickerStore } from '../../stores/datePicker'

const store = useGlobalStore()
const storeMonth = useMonthStore()
const storeDatePicker = useDatePickerStore()

let chartRef = ref()
let myChart = ref()

let chartInRef = ref()
let myInChart = ref()

let chartOutRef = ref()
let myOutChart = ref()
let roleFarmIdLocal = ref(localStorage.getItem('roleFarmId'))

onMounted(() => {
  fetchData(roleFarmIdLocal)
})

// Hàm gọi API
const fetchData = (roleFarmId) => {
  Promise.all([
    axios.get(
      `Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
  ]).then(([datesResponse, countOutResponse, countInResponse, countInResponseMonth, countOutResponseMonth]) => {
    storeMonth.setLabels(datesResponse.data)
    storeMonth.setDataOut(countOutResponse.data[0].ListCount)
    storeMonth.setDataIn(countInResponse.data[0].ListCount)
    storeMonth.setDataOutMonth(countOutResponseMonth.data[0].ListCount)
    storeMonth.setDataInMonth(countInResponseMonth.data[0].ListCount)
  })

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
      data: storeMonth.labels,
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
        data: storeMonth.dataOut,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
      {
        name: 'Số lượng nhập chuồng',
        type: 'line',
        data: storeMonth.dataIn,
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max',
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max',
                },
                type: 'max',
                name: '最高点',
              },
            ],
          ],
        },
      },
    ],
  }
  myChart.value.setOption(option)

  myInChart.value = echarts.init(chartInRef.value)
  let optionIn = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      data: storeMonth.labels,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [
      {
        name: 'Số lượng nhập chuồng',
        data: storeMonth.dataIn,
        type: 'bar',
      },
    ],
  }
  myInChart.value.setOption(optionIn)

  myOutChart.value = echarts.init(chartOutRef.value)
  let optionOut = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      data: storeMonth.labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Số lượng xuất chuồng',
        data: storeMonth.dataOut,
        type: 'bar',
        itemStyle: {
            color: '#a90000'
          }
      },
    ],
  }
  myOutChart.value.setOption(optionOut)
}

watch(
  [() => store.roleFarmId, () => storeDatePicker.endDate], // Watch both properties
  async ([newRoleFarmId, newEndDate]) => {
    // Destructure the new values
    if (newRoleFarmId && newEndDate) {
      await fetchData(newRoleFarmId) // Fetch data again with the new roleFarmId
    }
  },
  { immediate: true }, // Call immediately on mount as well
)
</script>
