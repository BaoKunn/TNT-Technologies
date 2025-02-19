<script setup lang="ts">
import { defineVaDataTableColumns } from 'vuestic-ui'
import UserAvatar from '../../../users/widgets/UserAvatar.vue'
import ProjectStatusBadge from '../../../projects/components/ProjectStatusBadge.vue'
import { useProjects } from '../../../projects/composables/useProjects'
import { Pagination } from '../../../../data/pages/projects'
import { ref } from 'vue'
import { useProjectUsers } from '../../../projects/composables/useProjectUsers'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-dt'
import { DatetimeFormat } from 'vue-i18n'

DataTable.use(DataTablesCore)

// const columns = defineVaDataTableColumns([
//   { label: 'Name', key: 'project_name', sortable: true },
//   { label: 'Status', key: 'status', sortable: true },
//   { label: 'Team', key: 'team', sortable: true },
// ])

const pagination = ref<Pagination>({ page: 1, perPage: 5, total: 0 })
const { projects, isLoading, sorting } = useProjects({
  pagination,
})

const { getTeamOptions, getUserById } = useProjectUsers()
const columns = [
  { data: 'name', title: 'STT' },
  { data: 'position', title: 'Position' },
  { data: 'office', title: 'Office' },
  { data: 'extn', title: 'Extension' },
  { data: 'start_date', title: 'Start date' },
  { data: 'salary', title: 'Salary' },
];
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
const options = {
  responsive: true,
  select: true,
};


</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn trong chuồng</h1>
      <!-- <VaButton preset="primary" size="small" to="/projects">View all projects</VaButton> -->
    </VaCardTitle>
    <VaCardContent>
      <DataTable :data="data" class="cell-border stripe hover" style="border: 1px solid;">
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