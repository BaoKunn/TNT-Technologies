<template>
  <h1 class="page-title">Bảng số lợn xuất/nhập chi tiết</h1>
  <div class="mb-4">
    <Filter />
  </div>
  <VaCard class="mb-6">
    <VaCardContent class="min-h-[250px]">
      <h1 class="text-xl font-bold mb-4">Bảng số nhập/xuất chi tiết</h1>
      <ATable :data-source="dataSource" :columns="columns" bordered :pagination="false"/>
    </VaCardContent>
  </VaCard>
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="w-full sm:w-[100%] lg:w-[50%]">
      <VaCard>
        <VaCardTitle>Video 1</VaCardTitle>
        <VaCardContent>
          <!-- Kiểm tra dữ liệu video trước khi render iframe -->
          <iframe
            v-if="dataSource.length > 0 && dataSource[0].LinkVideoOriginal"
            width="100%"
            height="300"
            :src="dataSource[0].LinkVideoOriginal"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </VaCardContent>
      </VaCard>
    </div>
    <div class="w-full sm:w-[100%] lg:w-[50%]">
      <VaCard>
        <VaCardTitle>Video 2</VaCardTitle>
        <VaCardContent>
          <iframe
            v-if="dataSource.length > 0 && dataSource[0].LinkVideo"
            width="100%"
            height="300"
            :src="dataSource[0].LinkVideo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    ExclamationCircleOutlined,
  },
  data() {
    const id = this.$route.params.id
    const columns = [
      { dataIndex: 'BillID', title: 'Mã Bill' },
      { dataIndex: 'PetTypeID', title: 'Loại lợn' },
      { dataIndex: 'Quantity', title: 'Số lượng' },
      { dataIndex: 'TotalExchange', title: 'Số lượng xuất' },
      { dataIndex: 'UnitPrice', title: 'Loại tiền' },
      { dataIndex: 'weight', title: 'Cân nặng' },
    ]
    return {
      dataSource: [],
      columns,
      id,
    }
  },
  mounted() {
    axios.get(`https://farmapidev.tnt-tech.vn/api/BILL_DETAILS/${this.id}`).then((response) => {
      this.dataSource = response.data
    })
  },
}
</script>
