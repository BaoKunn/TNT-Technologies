<template>
  <h1 class="page-title">Bảng số lợn xuất/nhập</h1>
  <div class="mb-4">
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent class="min-h-[250px]">
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <ATable :data-source="dataSource" :columns="columns" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'detail'">
            <!-- Add the click event to the icon -->
            <ExclamationCircleOutlined @click="goToDetail(record.BillID)" />
          </template>
        </template>
      </ATable>
    </VaCardContent>
  </VaCard>
</template>

<script>
import Filter from '../../components/filter/Filter.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    Filter,
    ExclamationCircleOutlined,
  },
  data() {
    const columns = [
      { dataIndex: 'STT', title: 'STT' },
      { dataIndex: 'BillDate', title: 'Ngày' },
      { dataIndex: 'FarmhouseID', title: 'Trại' },
      { dataIndex: 'CustomerID', title: 'Khách hàng' },
      { dataIndex: 'EmployeeID', title: 'Người phụ trách' },
      { dataIndex: 'ReasonDestroy', title: 'Lí do hủy' },
      { dataIndex: 'detail', title: 'Chi tiết', key: 'detail' },
    ]
    return {
      dataSource: [],
      columns,
    }
  },
  mounted() {
    axios.get('https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=1&BillImport=1').then((response) => {
      // Xử lý và format ngày cùng giờ trước khi lưu vào dataSource
      this.dataSource = response.data.map((item, index) => ({
        ...item,
        STT: index + 1, // Thêm số thứ tự bắt đầu từ 1
        BillDate: dayjs(item.BillDate).format('DD-MM-YYYY (hh:mm A)'), // Định dạng lại ngày và giờ
      }))
    })
  },
  methods: {
    // Method to handle redirection
    goToDetail(billId) {
      this.$router.push({ name: 'in-out-detail', params: { id: billId}})
    },
  },
}
</script>
