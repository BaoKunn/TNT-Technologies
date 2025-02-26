<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { useGlobalStore } from '../../../../stores/global-store';

export default {
  data() {
    const userID = localStorage.getItem('userID')
    return {
      dataSource: [],
      columns: [
        {
          title: 'STT',
          dataIndex: 'STT',
          width: '10%',
          align: 'center'
        },
        {
          title: 'Ngày',
          dataIndex: 'BillDate',
          align: 'center'
        },
        {
          title: 'Trại',
          dataIndex: 'FarmhouseID',
          align: 'center'
        },
        {
          title: 'Cửa',
          dataIndex: 'GateID',
          width: '10%',
          align: 'center'
        },
        {
          title: 'Khách hàng',
          dataIndex: 'CustomerID',
          align: 'center'
        },
      ],
      userID
    }
  },
  computed: {
    store() {
      return useGlobalStore(); // Truy cập store ở đây
    }
  },
  mounted() {
    axios.get(`https://farmapidev.tnt-tech.vn/api/BILLs?UsersID=${this.userID}&BillImport=1`).then((response) => {
      // Xử lý và format ngày cùng giờ trước khi lưu vào dataSource
      this.dataSource = response.data.map((item, index) => ({
        ...item,
        STT: index + 1, // Thêm số thứ tự bắt đầu từ 1
        BillDate: dayjs(item.BillDate).format('DD-MM-YYYY (hh:mm A)'), // Định dạng lại ngày và giờ
      }))
    })
  },
}
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn xuất/nhập chuồng</h1>
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

<style scoped>
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
