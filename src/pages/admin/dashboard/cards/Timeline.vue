<script setup lang="ts">
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-dt'

DataTable.use(DataTablesCore)

// const columns = defineVaDataTableColumns([
//   { label: 'Name', key: 'project_name', sortable: true },
//   { label: 'Status', key: 'status', sortable: true },
//   { label: 'Team', key: 'team', sortable: true },
// ])

const data = [
  [1, '19/2/2025', 'Phổ Yên', 1, 100],
  [2, '20/2/2025', 'Phổ Yên', 2, 200],
  [3, '21/2/2025', 'Phổ Yên', 3, 300],
  [4, '22/2/2025', 'Phổ Yên', 4, 400],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
  [5, '23/2/2025', 'Phổ Yên', 5, 500],
]
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn trong chuồng</h1>
      <!-- <VaButton preset="primary" size="small" to="/projects">View all projects</VaButton> -->
    </VaCardTitle>
    <VaCardContent>
      <DataTable :data="data" class="cell-border stripe hover" style="border: 1px solid">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ngày</th>
            <th>Trại</th>
            <th>Cửa</th>
            <th>Số lượng</th>
          </tr>
        </thead>
      </DataTable>
    </VaCardContent>
  </VaCard>
</template>
<style>
@import 'datatables.net-dt';
</style>
