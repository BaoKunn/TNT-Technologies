<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { useGlobalStore } from '../../../../stores/global-store'
import { onMounted, ref } from 'vue'

const store = useGlobalStore()
const userID = ref(localStorage.getItem('userID'))
let dataSource = ref([])

const columns = [
  {
    title: 'STT',
    dataIndex: 'STT',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Ngày',
    dataIndex: 'BillDate',
    align: 'center',
  },
  {
    title: 'Trại',
    dataIndex: 'FarmhouseID',
    align: 'center',
  },
  {
    title: 'Cửa',
    dataIndex: 'GateID',
    width: '15%',
    align: 'center',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'CustomerID',
    align: 'center',
  },
]

const filterFarmHouse = (FarmhouseID) => {
  // Kiểm tra FarmhouseID và trả về tên tương ứng
  if (FarmhouseID === '1') return 'Trại Phổ Yến'
  else if (FarmhouseID === '2') return 'Trại Thạch Thất'
  else if (FarmhouseID === '3') return 'Trại Thái Bình'
  else if (FarmhouseID === '4') return 'Trại Thanh Hóa'
  else if (FarmhouseID === '5') return 'Trại Cửa Lò'
  else if (FarmhouseID === '6') return 'Trại Cửa Hội'
  else if (FarmhouseID === '7') return 'Trại Quế Sơn'
  else if (FarmhouseID === '8') return 'Trại Điện Bàn'
  else if (FarmhouseID === '9') return 'Trại Thuận An'
  else if (FarmhouseID === '10') return 'Trại Dĩ An'
  else if (FarmhouseID === '11') return 'Trại Vĩnh Thạnh'
  else if (FarmhouseID === '12') return 'Trại Phong Điền'
}

const filterCustomer = (CustomerID) => {
  if (CustomerID == '1') return 'Mặc định'
  else if (CustomerID == '2') return 'AMAG'
  else if (CustomerID == '3') return 'Genetec'
  else if (CustomerID == '4') return 'Lenel'
  else if (CustomerID == '5') return 'HTG'
  else if (CustomerID == '6') return 'Chinhluh'
  else if (CustomerID == '7') return 'BAT'
}

onMounted(() => {
  axios.get(`https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=${userID.value}&BillImport=1`).then((response) => {
    // Xử lý và format ngày cùng giờ trước khi lưu vào dataSource
    dataSource.value = response.data.map((item, index) => ({
      ...item,
      STT: index + 1, // Thêm số thứ tự bắt đầu từ 1
      BillDate: dayjs(item.BillDate).format('DD-MM-YYYY (hh:mm A)'), // Định dạng lại ngày và giờ
      FarmhouseID: filterFarmHouse(item.FarmhouseID), // Sử dụng filterFarmHouse để chuyển đổi ID thành tên
      GateID: `Cổng ${item.GateID}`, // Định dạng lại cổng
      CustomerID: filterCustomer(item.CustomerID)
    }))
  }).catch((error) => {
    console.error("Error loading data:", error) // Kiểm tra lỗi API
  })
})
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn xuất/nhập chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <ATable class="ant-table-striped" :data-source="dataSource" :columns="columns" bordered :scroll="{ y: 300 }" />
    </VaCardContent>
  </VaCard>
</template>

<style scoped>
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
