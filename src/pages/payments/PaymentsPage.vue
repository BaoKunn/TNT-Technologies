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

<script lang="ts" setup>
import VaChart from '../../components/va-charts/VaChart.vue'
import { ChartOptions } from 'chart.js'
import Filter from '../../components/filter/Filter.vue'
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useMonthStore } from '../../stores/monthlyEaring'
import { useDatePickerStore } from '../../stores/datePicker'

const store = useMonthStore()
const storeDatePicker = useDatePickerStore()

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

const chartData = reactive({
  labels: store.labels,
  datasets: [
    {
      label: 'Xuất chuồng',
      data: store.dataOut,
      backgroundColor: ['blue'],
    },
    {
      label: 'Nhập chuồng',
      data: store.dataIn,
      backgroundColor: ['red'],
    },
  ],
})

const chartDataInMonth = reactive({
  labels: store.labels,
  datasets: [
    {
      label: 'Nhập chuồng',
      data: store.dataIn,
      backgroundColor: ['green'],
    },
  ],
})

const chartDataOutMonth = reactive({
  labels: store.labels,
  datasets: [
    {
      label: 'Nhập chuồng',
      data: store.dataOut,
      backgroundColor: ['Olive'],
    },
  ],
})

onMounted(() => {
  Promise.all([
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
  ]).then(([datesResponse, countOutResponse, countInResponse, countInResponseMonth, countOutResponseMonth]) => {
    store.setLabels(datesResponse.data)
    store.setDataOut(countOutResponse.data[0].ListCount)
    store.setDataIn(countInResponse.data[0].ListCount)
    store.setDataOutMonth(countOutResponseMonth.data[0].ListCount)
    store.setDataInMonth(countInResponseMonth.data[0].ListCount)
  })
})
</script>
