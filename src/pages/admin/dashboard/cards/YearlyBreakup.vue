<template>
  <VaCard>
    <VaCardTitle>
      <h1 class="font-bold uppercase text-lg text-black">Số lượng heo trong chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <div ref="chartRef" class="w-full flex items-center h-[400px]"></div>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { VaCard } from 'vuestic-ui'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
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
let startDateLocal = ref(localStorage.getItem('startDate'))
let endDateLocal = ref(localStorage.getItem('endDate'))

// onMounted(async () => {
//   if (roleFarmIdLocal.value) {
//     fetchData(roleFarmIdLocal.value, startDateLocal.value, endDateLocal.value)
//   }
// })

const fetchData = async (roleFarmId, startDateLocal, endDateLocal) => {
  try {
    // Gọi các API và đợi kết quả trả về
    const [datesResponse, countResponse, refundResponse] = await Promise.all([
      axios.get(
        `/Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId}&fromdate=${startDateLocal}&todate=${endDateLocal}&BillImport=3`,
      ),
      axios.get(
        `/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${startDateLocal}&todate=${endDateLocal}&BillImport=3`,
      ),
      axios.get(
        `/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${startDateLocal}&todate=${endDateLocal}&BillImport=2`,
      ),
    ])

    const totalInGate = countResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0
    const totalRefund = refundResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0

    storeYearly.setTotalRefund(totalRefund)
    storeYearly.setTotalInGate(totalInGate)

    // Cập nhật dữ liệu vào store
    storeYearly.setLabels(datesResponse.data)
    storeYearly.setData(countResponse.data[0]?.ListCount)

    // Chỉ vẽ biểu đồ sau khi dữ liệu đã được tải đầy đủ
    if (!myChart.value) {
      myChart.value = echarts.init(chartRef.value)
    }
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

// watch(
//   [() => store.roleFarmId, () => storeDatePicker.endDate], // Watch both properties
//   async ([newRoleFarmId, newEndDate]) => {
//     // Destructure the new values
//     if (newRoleFarmId && newEndDate) {
//       await fetchData(store.roleFarmId, storeDatePicker.startDate, storeDatePicker.endDate) // Fetch data again with the new roleFarmId
//     }
//   },
//   { immediate: true }, // Call immediately on mount as well
// )
// watch(
//   () => store.roleFarmId,
//   (newValue) => {
//     if (newValue) {
//       fetchData(store.roleFarmId, startDateLocal.value, endDateLocal.value)
//     }
//   },
// )
// watch(
//   () => storeDatePicker.endDate,
//   (newValue) => {
//     if (newValue) {
//       fetchData(store.roleFarmId, storeDatePicker.startDate, storeDatePicker.endDate)
//     }
//   },
// )
</script>
