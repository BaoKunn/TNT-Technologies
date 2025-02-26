<template>
  <VaCard>
    <VaCardTitle>
      <h1 class="font-bold uppercase text-lg text-black">Số lượng heo trong chuồng</h1>
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
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { onMounted, reactive } from 'vue'
import axios from 'axios'

const lineChartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Trong chuồng',
      data: [],
      backgroundColor: ['orange'],
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
      'https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=[1]&fromdate=03/01/2024&todate=09/30/2024&BillImport=3',
    ),
    axios.get(
      'https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=[1,2,3,4,5,6,7,8,9,10,11,12]&fromdate=03/01/2024&todate=09/30/2024&BillImport=3',
    ),
  ]).then(([datesResponse, countResponse]) => {
    lineChartData.labels = datesResponse.data
    lineChartData.datasets[0].data = countResponse.data[0].ListCount
  })
})
</script>
