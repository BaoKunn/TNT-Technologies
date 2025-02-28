<template>
  <VaCard>
    <VaCardTitle>
      <h1 class="font-bold uppercase text-lg text-black">Số lượng heo trong chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <div ref="chartRef"  class="w-full flex items-center h-[400px]"></div>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { VaCard } from 'vuestic-ui'
import * as echarts from 'echarts'
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useGlobalStore } from '../../../../stores/global-store'
import { useYearlyStore } from '../../../../stores/yearlyBreakup'
import { useDatePickerStore } from '../../../../stores/datePicker'

const store = useGlobalStore()
const storeYearly = useYearlyStore()
const storeDatePicker = useDatePickerStore()

let chartRef = ref()
let myChart = ref()
let roleFarmId = ref(localStorage.getItem('roleFarmId'))

// Dữ liệu biểu đồ
const lineChartData = reactive({
  labels: storeYearly.labels,
  datasets: [
    {
      label: 'Trong chuồng',
      data: storeYearly.data,
      backgroundColor: ['orange'],
    },
  ],
})

const options = {
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
      },
    },
    y: {
      display: true,
      grid: {
        display: true,
      },
      ticks: {
        display: true,
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

onMounted(async () => {
  if (store.roleFarmId) {
    try {
    // Gọi các API và đợi kết quả trả về
    const [datesResponse, countResponse] = await Promise.all([
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId.value}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`
      ),
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId.value}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`
      ),
    ])

    // Cập nhật dữ liệu vào store
    storeYearly.setLabels(datesResponse.data)
    storeYearly.setData(countResponse.data[0]?.ListCount)

    // Chỉ vẽ biểu đồ sau khi dữ liệu đã được tải đầy đủ
    myChart.value = echarts.init(chartRef.value)
    const option = {
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
          name: 'Số lượng trong chuồng',
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
        },
      ],
    }

    // Vẽ biểu đồ
    myChart.value.setOption(option)

  } catch (error) {
    console.error('Error fetching data for chart:', error)
  }
  }
})

// Watch để theo dõi sự thay đổi của roleFarmId
// watch(
//   () => store.roleFarmId,
//   (newRoleFarmId) => {
//     if (newRoleFarmId) {
//       fetchData(newRoleFarmId)  // Gọi lại fetchData khi roleFarmId thay đổi
//     }
//   }
// )
</script>
