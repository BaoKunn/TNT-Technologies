<script setup>
import RevenueUpdates from './cards/RevenueReport.vue'
import RevenueUpdatesPie from './cards/RevenueReportPie.vue'
import ProjectTable from './cards/ProjectTable.vue'
import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
import DataSection from './DataSection.vue'
import YearlyBreakup from './cards/YearlyBreakup.vue'
import MonthlyEarnings from './cards/MonthlyEarnings.vue'
import RegionRevenue from './cards/RegionRevenue.vue'
import Timeline from './cards/Timeline.vue'
import Filter from '../../../components/filter/Filter.vue'
</script>

<template>
  <div class="flex items-center justify-between w-full mb-[18px]">
    <!-- Page title aligned to the left -->
    <h1 class="page-title font-bold">Dashboard</h1>
    <!-- Filter component on the right -->
    <Filter />
  </div>
  <section class="flex flex-col gap-4">
    <DataSection />
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Cột 1 (MonthlyEarnings và YearlyBreakup) chiếm 2 phần -->
      <div class="flex flex-col gap-4 w-full sm:w-2/3">
        <MonthlyEarnings />
        <YearlyBreakup />
      </div>

      <!-- Cột 2 (RevenueUpdates) chiếm 1 phần -->
      <div class="flex flex-col gap-4 w-full sm:w-1/3">
      <!-- RevenueUpdates chart -->
      <RevenueUpdates class="w-full" />
      
      <!-- RevenueUpdatesPie chart -->
      <RevenueUpdatesPie class="w-full" />
    </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-4">
      <ProjectTable class="w-full sm:w-[100%] lg:w-[50%]" />
      <Timeline class="w-full sm:w-[100%] lg:w-[50%]" />
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <RevenueByLocationMap class="w-full md:w-4/6" />
      <RegionRevenue class="w-full md:w-2/6" />
    </div>
  </section>
</template>
