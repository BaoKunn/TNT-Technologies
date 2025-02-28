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
let roleFarmIdLocal = ref(localStorage.getItem('roleFarmId'))

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
  fetchData(roleFarmIdLocal)
})

const fetchData = async (roleFarmId) => {
  try {
    // Gọi các API và đợi kết quả trả về
    const [datesResponse, countResponse, refundResponse] = await Promise.all([
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`
      ),
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=3`
      ),
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=2`
      ),
    ])

    const totalInGate = countResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0;
    const totalRefund = refundResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0;

    storeYearly.setTotalRefund(totalRefund)
    storeYearly.setTotalInGate(totalInGate)

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

// Watch để theo dõi sự thay đổi của roleFarmId
// watch(
//   () => store.roleFarmId,
//   (newRoleFarmId) => {
//     if (newRoleFarmId) {
//       fetchData(newRoleFarmId)  // Gọi lại fetchData khi roleFarmId thay đổi
//     }
//   }
// )
watch(
  [() => store.roleFarmId, () => storeDatePicker.endDate],  // Watch both properties
  async ([newRoleFarmId, newEndDate]) => {  // Destructure the new values
    if (newRoleFarmId && newEndDate) {
      await fetchData(newRoleFarmId);  // Fetch data again with the new roleFarmId
    }
  },
  { immediate: true }  // Call immediately on mount as well
)
</script>
