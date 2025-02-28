<template>
  <h1 class="page-title">Biểu đồ xuất nhập</h1>
  <div class="mb-4">
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

  <div class="flex flex-col md:flex-row gap-4">
    <VaCard class="h-[380px] grid grid-cols-1 sm:grid-cols-1">
      <VaCardContent>
        <div class="w-full h-[300px]">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn nhập chuồng theo tháng</h1>
          <VaChart :data="chartDataInMonth" type="bar" :options="options" />
        </div>
      </VaCardContent>
    </VaCard>
    <VaCard class="h-[380px] grid grid-cols-1 sm:grid-cols-1">
      <VaCardContent>
        <div class="w-full h-[300px]">
          <h1 class="text-xl font-bold mb-4">Biểu đồ số lượng lợn xuất chuồng theo tháng</h1>
          <VaChart :data="chartDataOutMonth" type="bar" :options="options" />
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup>
import VaChart from '../../components/va-charts/VaChart.vue'
import Filter from '../../components/filter/Filter.vue'
import { onMounted, reactive, ref, watch } from 'vue'
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
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
}

const chartData = reactive({
  labels: storeMonth.labels,
  datasets: [
    {
      label: 'Xuất chuồng',
      data: storeMonth.dataOut,
      backgroundColor: ['blue'],
    },
    {
      label: 'Nhập chuồng',
      data: storeMonth.dataIn,
      backgroundColor: ['red'],
    },
  ],
})

const chartDataInMonth = reactive({
  labels: storeMonth.labels,
  datasets: [
    {
      label: 'Nhập chuồng',
      data: storeMonth.dataIn,
      backgroundColor: ['green'],
    },
  ],
})

const chartDataOutMonth = reactive({
  labels: storeMonth.labels,
  datasets: [
    {
      label: 'Nhập chuồng',
      data: storeMonth.dataOut,
      backgroundColor: ['Olive'],
    },
  ],
})

onMounted(() => {
  // if (store.roleFarmId) {
  //   fetchData(store.roleFarmId)
  // }

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
})

// Hàm gọi API
const fetchData = (roleFarmId) => {
  Promise.all([
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
  ]).then(([datesResponse, countOutResponse, countInResponse, countInResponseMonth, countOutResponseMonth]) => {
    storeMonth.setLabels(datesResponse.data)
    storeMonth.setDataOut(countOutResponse.data[0].ListCount)
    storeMonth.setDataIn(countInResponse.data[0].ListCount)
    storeMonth.setDataOutMonth(countOutResponseMonth.data[0].ListCount)
    storeMonth.setDataInMonth(countInResponseMonth.data[0].ListCount)
  })
}

// Sử dụng watch để theo dõi sự thay đổi của store.roleFarmId
// watch(
//   () => store.roleFarmId,
//   (newRoleFarmId) => {
//     // Kiểm tra nếu newRoleFarmId có dữ liệu hợp lệ
//     if (newRoleFarmId) {
//       fetchData(newRoleFarmId)
//     }
//   },
// )
</script>
