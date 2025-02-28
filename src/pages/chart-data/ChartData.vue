<template>
  <div class="flex items-center justify-between w-full mb-[18px]">
    <h1 class="page-title font-bold w-full">Bảng số lợn xuất/nhập</h1>
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent class="min-h-[250px]">
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <ATable :data-source="dataSource" :columns="columns" bordered :loading="loading">
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
      { dataIndex: 'STT', title: 'STT', align: 'center' },
      { dataIndex: 'BillDate', title: 'Ngày', align: 'center'  },
      { dataIndex: 'FarmhouseID', title: 'Trại', align: 'center'  },
      { dataIndex: 'CustomerID', title: 'Khách hàng', align: 'center'  },
      { dataIndex: 'EmployeeID', title: 'Người phụ trách', align: 'center'  },
      { dataIndex: 'ReasonDestroy', title: 'Lí do hủy', align: 'center'  },
      { dataIndex: 'detail', title: 'Chi tiết', key: 'detail', align: 'center'  },
    ]
    return {
      dataSource: [],
      columns,
      loading: false, // Add the loading state
    }
  },
  mounted() {
    this.loading = true; // Set loading to true when the API call is made
    axios.get('https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=1&BillImport=1').then((response) => {
      this.dataSource = response.data.map((item, index) => ({
        ...item,
        STT: index + 1, // Add serial number starting from 1
        BillDate: dayjs(item.BillDate).format('DD-MM-YYYY (hh:mm A)'), // Format date and time
      }))
      this.loading = false; // Set loading to false once the data is loaded
    }).catch((error) => {
      this.loading = false; // Also set loading to false in case of an error
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
