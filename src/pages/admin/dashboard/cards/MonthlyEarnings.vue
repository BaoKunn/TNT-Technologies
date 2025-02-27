<template>
  <VaCard>
    <VaCardTitle>
      <h1 class="font-bold uppercase text-lg text-black">Số lượng nhập/xuất chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <div class="w-full flex items-center h-[200px]">
        <VaChart :data="lineChartData" class="h-32" type="bar" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { VaCard } from 'vuestic-ui'
import axios from 'axios'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { onMounted, reactive } from 'vue'
import { useMonthStore } from '../../../../stores/monthlyEaring'
import { useDatePickerStore } from '../../../../stores/datePicker'

const store = useMonthStore()
const storeDatePicker = useDatePickerStore()

const lineChartData = reactive({
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

onMounted(() => {
  Promise.all([
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=[1]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
    ),
    axios.get(
      `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
    ),
  ]).then(([datesResponse, countOutResponse, countInResponse]) => {
    store.setLabels(datesResponse.data)
    store.setDataIn(countOutResponse.data[0].ListCount)
    store.setDataOut(countInResponse.data[0].ListCount)
  })
})
</script>
