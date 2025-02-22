<template>
  <h1 class="page-title">Bảng số lợn trong chuồng</h1>
  <div class="mb-4">
    <label for="local">Khu vực: </label>
    <select id="local" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" placeholder="Chọn khu vực">
      <option value="Miền Bắc">Miền Bắc</option>
      <option value="Miền Trung">Miền Trung</option>
    </select>
    <label for="city">Thành phố/Tỉnh: </label>
    <select id="city" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="" placeholder="Chọn khu vực">
      <option value="Hà Nội">Hà Nội</option>
      <option value="Thái Nguyên">Thái Nguyên</option>
    </select>
    <label for="farm">Trang trại: </label>
    <select id="farm" class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" placeholder="Chọn khu vực">
      <option value="Farm 1">Farm 1</option>
      <option value="Farm 2">Farm 2</option>
    </select>
    <label for="time">Thời gian: </label>
    <VaDateInput id="time" v-model="date" class="mr-2 w-[140px] rounded-[10px]" />
    <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm<VaIcon name="vasearch" /></VaButton>
  </div>
  <VaCard class="mb-6">
    <VaCardContent>
      <DataTable :columns="columns" :data="data" :options="options" class="display nowrap"
        ><template #column-extn="props"> <Button :text="`Extn: ${props.cellData}`"></Button> </template
      ></DataTable>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { VaDateInput, VaIcon } from 'vuestic-ui'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-dt'
import 'datatables.net-select-dt'
import 'datatables.net-responsive-dt'
import axios from 'axios'
import { onMounted } from 'vue'

DataTable.use(DataTablesCore)

onMounted(() => {
  axios.get('http://farmapidev.tnt-tech.vn/api/FARMHOUSEs/2')
})

const date = new Date()
const columns = [
  { data: 'stt', title: 'STT' },
  { data: 'day', title: 'Ngày' },
  { data: 'farm', title: 'Trại' },
  { data: 'cage', title: 'Chuồng' },
  { data: 'equiment', title: 'Thiết bị' },
  { data: 'quantity', title: 'Số lượng' },
]
const data = [
  { stt: '1', day: '2024-08-12 18:30:00', farm: 'Phổ Yên', cage: '1', equiment: 'Counting Box 1', quantity: 123 },
  { stt: '2', day: '2024-08-11 18:30:00', farm: 'Hà Nội', cage: '2', equiment: 'Counting Box 2', quantity: 270 },
  { stt: '3', day: '2024-08-10 18:30:00', farm: 'Phú Thọ', cage: '3', equiment: 'Counting Box 3', quantity: 178 },
  { stt: '4', day: '2024-08-09 18:30:00', farm: 'Hưng Yên', cage: '4', equiment: 'Counting Box 4', quantity: 167 },
  { stt: '5', day: '2024-08-08 18:30:00', farm: 'Nam Định', cage: '5', equiment: 'Counting Box 5', quantity: 194 },
  { stt: '6', day: '2024-08-07 18:30:00', farm: 'Thái Bình', cage: '6', equiment: 'Counting Box 6', quantity: 98 },
  { stt: '7', day: '2024-08-06 18:30:00', farm: 'Bắc Ninh', cage: '7', equiment: 'Counting Box 7', quantity: 45 },
  { stt: '8', day: '2024-08-05 18:30:00', farm: 'Hải Phòng', cage: '8', equiment: 'Counting Box 8', quantity: 78 },
  { stt: '9', day: '2024-08-04 18:30:00', farm: 'Hải Phòng', cage: '9', equiment: 'Counting Box 9', quantity: 245 },
  { stt: '10', day: '2024-08-03 18:30:00', farm: 'Ninh Bình', cage: '10', equiment: 'Counting Box 10', quantity: 41 },
  { stt: '11', day: '2024-08-02 18:30:00', farm: 'Hòa Bình', cage: '11', equiment: 'Counting Box 11', quantity: 123 },
]
const options = {
  responsive: true,
  select: true,
}
</script>
<style>
@import 'datatables.net-dt';
</style>
