<script lang="ts" setup>
import RevenueUpdates from './cards/RevenueReport.vue'
import ProjectTable from './cards/ProjectTable.vue'
import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
import DataSection from './DataSection.vue'
import YearlyBreakup from './cards/YearlyBreakup.vue'
import MonthlyEarnings from './cards/MonthlyEarnings.vue'
import RegionRevenue from './cards/RegionRevenue.vue'
import Timeline from './cards/Timeline.vue'
</script>

<template>
  <h1 class="page-title font-bold">Dashboard</h1>
  <section class="flex flex-col gap-4">
    <div>
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
      <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm</VaButton>
    </div>
    <DataSection />
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex flex-col gap-4 w-full sm:w-[50%]">
        <MonthlyEarnings/>
        <YearlyBreakup class="h-full" />
      </div>
      <RevenueUpdates class="w-full sm:w-[50%]" />
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <ProjectTable class="w-full sm:w-[50%]" />
      <Timeline class="w-full sm:w-[50%]" />
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <RevenueByLocationMap class="w-full md:w-4/6" />
      <RegionRevenue class="w-full md:w-2/6" />
    </div>
    
  </section>
</template>
