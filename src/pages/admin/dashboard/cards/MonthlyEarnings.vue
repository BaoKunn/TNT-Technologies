<template>
  <VaCard>
    <VaCardTitle>
      <h1 class="font-bold uppercase text-lg text-black">Số lượng nhập/xuất chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <div ref="chartRef" class="w-full flex items-center h-[400px]">
        <!-- Display chart here -->
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { VaCard } from 'vuestic-ui'
import * as echarts from 'echarts'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useGlobalStore } from '../../../../stores/global-store'
import { useMonthStore } from '../../../../stores/monthlyEaring'
import { useDatePickerStore } from '../../../../stores/datePicker'

const store = useGlobalStore()
const storeMonthly = useMonthStore()
const storeDatePicker = useDatePickerStore()

let chartRef = ref()
let myChart = ref()
let roleFarmIdLocal = ref(localStorage.getItem('roleFarmId'))

// Call fetchData on component mount as well
onMounted(() => {
  fetchData(roleFarmIdLocal) // Ensure that data is fetched initially
})

// Fetch data based on roleFarmId
const fetchData = async (roleFarmId) => {
  try {
    // API calls
    const [datesResponse, countOutResponse, countInResponse] = await Promise.all([
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetListDateOfBill?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
      ),
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=1`,
      ),
      axios.get(
        `https://farmapidev.tnt-tech.vn/api/Bills/GetTotalPetsInGate?ListFarmhouse=${roleFarmId}&fromdate=${storeDatePicker.startDate}&todate=${storeDatePicker.endDate}&BillImport=0`,
      ),
    ])

    const totalIn = countInResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0;
    const totalOut = countOutResponse?.data[0]?.ListCount?.reduce((sum, current) => sum + current, 0) || 0;

    storeMonthly.setTotalIn(totalIn)
    storeMonthly.setTotalOut(totalOut)

    // Update the store with new data
    storeMonthly.setLabels(datesResponse.data)
    storeMonthly.setDataIn(countInResponse?.data[0]?.ListCount)
    storeMonthly.setDataOut(countOutResponse?.data[0]?.ListCount)

    // Initialize the chart if not already initialized
    if (!myChart.value) {
      myChart.value = echarts.init(chartRef.value)
    }

    // Define the chart options
    const option = {
      tooltip: {
    trigger: 'axis'
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
        data: storeMonthly.labels,
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
          data: storeMonthly.dataOut,
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
          data: storeMonthly.dataIn,
          markPoint: {
            data: [{ name: '最低', value: -2, xAxis: 1, yAxis: -1.5 }],
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

    // Set the chart options
    myChart.value.setOption(option)
  } catch (error) {
    console.error('Error loading data for chart:', error)
  }
}

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
