<script>
import axios from 'axios'

export default {
  data() {
    const columns = [
      {
        title: 'STT',
        dataIndex: 'STT', // Sử dụng 'STT' từ dữ liệu đã xử lý
        width: '10%',
      },
      {
        title: 'Ngày',
        dataIndex: 'BillDate',
      },
      {
        title: 'Trại',
        dataIndex: 'FarmhouseID',
      },
      {
        title: 'Cửa',
        dataIndex: 'GateID',
        width: '10%',
      },
      {
        title: 'Khách hàng',
        dataIndex: 'CustomerID',
      },
    ]
    return {
      dataSource: [],
      columns,
    }
  },
  mounted() {
    axios.get('https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=1&BillImport=3').then((response) => {
      // Xử lý thêm cột STT vào dữ liệu API
      this.dataSource = response.data.map((item, index) => ({
        ...item,
        STT: index + 1, // Thêm số thứ tự bắt đầu từ 1
      }))
    })
  },
}
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn trong chuồng</h1>
    </VaCardTitle>
    <VaCardContent>
      <ATable
        class="ant-table-striped"
        :data-source="dataSource"
        :columns="columns"
        bordered
        :scroll="{ y: 300 }"
      />
    </VaCardContent>
  </VaCard>
</template>
