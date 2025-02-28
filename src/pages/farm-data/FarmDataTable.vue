<template>
  <div class="flex items-center justify-between w-full mb-[18px]">
    <h1 class="page-title font-bold w-full">Bảng số lợn trong chuồng</h1>
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent><ATable :data-source="dataSource" :columns="columns" bordered :loading="loading" /></VaCardContent>
  </VaCard>
</template>

<script>
import Filter from '../../components/filter/Filter.vue'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    Filter,
  },
  data() {
    const columns = [
      { dataIndex: 'STT', title: 'STT', align: 'center' },
      { dataIndex: 'BillDate', title: 'Ngày', align: 'center' },
      { dataIndex: 'FarmhouseID', title: 'Trại', align: 'center' },
      { dataIndex: 'CustomerID', title: 'Khách hàng', align: 'center' },
      { dataIndex: 'EmployeeID', title: 'Người phụ trách', align: 'center' },
      { dataIndex: 'ReasonDestroy', title: 'Lí do hủy', align: 'center' },
    ]
    return {
      columns,
      dataSource: [],
      loading: false,
    }
  },
  mounted() {
    this.loading = true // Set loading to true when the API call is made
    axios
      .get('https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=1&BillImport=3')
      .then((response) => {
        this.dataSource = response.data.map((item, index) => ({
          ...item,
          STT: index + 1, // Add serial number starting from 1
          BillDate: dayjs(item.BillDate).format('DD-MM-YYYY (hh:mm A)'), // Format date and time
        }))
        this.loading = false // Set loading to false once the data is loaded
      })
      .catch((error) => {
        this.loading = false // Also set loading to false in case of an error
      })
  },
}
</script>
