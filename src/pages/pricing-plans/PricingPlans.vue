<template>
  <h1 class="page-title">Biểu đồ trong chuồng</h1>
  <div class="mb-4">
    <label for="local">Khu vực: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" id="local" placeholder="Chọn khu vực">
      <option value="Miền Bắc">Miền Bắc</option>
      <option value="Miền Trung">Miền Trung</option>
    </select>
    <label for="city">Thành phố/Tỉnh: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="" id="city" placeholder="Chọn khu vực">
      <option value="Hà Nội">Hà Nội</option>
      <option value="Thái Nguyên">Thái Nguyên</option>
    </select>
    <label for="farm">Trang trại: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" id="farm" placeholder="Chọn khu vực">
      <option value="Farm 1">Farm 1</option>
      <option value="Farm 2">Farm 2</option>
    </select>
    <label for="time">Thời gian: </label>
    <VaDateInput id="time" v-model="date" class="mr-2 w-[140px] rounded-[10px]" />
    <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm<VaIcon name="vasearch" /></VaButton>
  </div>
  <!-- <div class="flex flex-col p-4 bg-backgroundSecondary">
    <div class="flex justify-center">
      <VaButtonToggle
        v-model="selectedDuration"
        color="background-element"
        border-color="background-element"
        :options="[
          { label: 'Monthly', value: 'Monthly' },
          { label: 'Annual', value: 'Annual' },
        ]"
      />
    </div>
    <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-6 md:space-y-0 mt-6">
      <VaCard
        v-for="plan in pricingPlans"
        :key="plan.model"
        :class="{
          'md:!py-10 !bg-backgroundCardSecondary': plan.model === 'Advanced',
          '!bg-backgroundCardPrimary': plan.model !== 'Advanced',
          'ring-2 ring-primary ring-offset-2': plan.model === selectedPlan,
        }"
        class="flex w-[326px] md:w-[349px] h-fit p-6 rounded-[13px]"
      >
        <div :class="{ '!space-y-10': plan.model === 'Advanced' }" class="space-y-8 md:space-y-10">
          <div class="space-y-4 text-center">
            <h2 class="pricing-plan-card-title">
              {{ plan.title }}
            </h2>
            <VaBadge v-for="badge in plan.badges" :key="badge" :style="badgeStyles" :text="badge" color="primary" />
            <p class="text-lg leading-[26px] text-secondary">
              {{ plan.description }}
            </p>
            <div class="flex space-x-1 justify-center items-baseline text-lg leading-[26px]">
              <span>$</span
              ><span class="text-[32px] md:text-5xl leading-[110%] md:leading-[56px] font-bold">{{
                selectedDuration === 'Annual' ? plan.price : plan.priceMonth
              }}</span
              ><span>/ {{ selectedDuration === 'Annual' ? 'year' : 'mo' }}</span>
            </div>
          </div>
          <div class="space-y-6">
            <div
              v-for="feature in plan.features"
              :key="feature.description"
              class="flex justify-between items-center text-lg leading-[26px]"
            >
              <p :class="{ 'text-secondary': !feature.isAvailable }">
                {{ feature.description }}
              </p>
              <VaIcon v-if="feature.isAvailable" color="primary" name="mso-check" size="20px" />
              <VaIcon v-else color="backgroundBorder" name="mso-block" size="20px" />
            </div>
          </div>
          <div class="flex justify-center">
            <VaButton
              :disabled="plan.model === selectedPlan"
              :style="selectButtonStyles"
              @click="createModal(plan.model)"
            >
              Select
            </VaButton>
          </div>
        </div>
      </VaCard>
    </div>
  </div> -->
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn trong chuồng số 1 theo ngày</h1>
      <div>
        <VaChart :data="chartData" type="bar" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn trong chuồng số 1 theo tháng</h1>
      <div>
        <VaChart :data="chartData" type="bar" :options="options" />
      </div>
    </VaCardContent>
  </VaCard>
</template>
<script lang="ts" setup>
import { useChartData } from '../../data/charts/composables/useChartData';
import { barChartData } from '../../data/charts';
import { ChartOptions } from 'chart.js';
import VaChart from '../../components/va-charts/VaChart.vue';

const chartData = useChartData(barChartData)

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
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
    },
  },
}

const date = new Date()
</script>
