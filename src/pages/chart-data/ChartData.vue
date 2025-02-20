<template>
  <h1 class="page-title">Bảng số lợn xuất/nhập</h1>
  <div class="mb-4">
    <label for="local">Khu vực: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" id="local" placeholder="Chọn khu vực">
      <option value="Miền Bắc">Miền Bắc</option>
      <option value="Miền Trung">Miền Trung</option>
    </select>
    <label for="city">Thành phố/Tỉnh: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="" id="city" placeholder="Chọn khu vực">
      <option value="Hà Nội">Hà Nội</option>
      <option value="Thái Nguyên">Thái Nguyên</option>
    </select>
    <label for="farm">Trang trại: </label>
    <select class="mr-2 p-2 rounded-[10px] cursor-pointer" name="Khu vực" id="farm" placeholder="Chọn khu vực">
      <option value="Farm 1">Farm 1</option>
      <option value="Farm 2">Farm 2</option>
    </select>
    <label for="time">Thời gian: </label>
    <VaDateInput id="time" v-model="date" class="mr-2 w-[140px] rounded-[10px]" />
    <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm<VaIcon name="vasearch" /></VaButton>
  </div>
  <VaCard class="mb-6">
    <VaCardContent>
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <VaInput v-model="filter" placeholder="Filter..." class="w-full" />
        <!-- <VaSelect
          v-model="filterByFields"
          placeholder="Select filter fields"
          :options="columnsWithName"
          value-by="value"
          multiple
        /> -->
      </div>
      <VaDataTable
        :items="items"
        :columns="columns"
        virtual-scroller
        sticky-header
        height="440px"
        :striped="true"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
      />
    </VaCardContent>
  </VaCard>
</template>

<script>
import { VaDateInput, VaIcon, VaDataTable } from 'vuestic-ui'
import { computed, ref } from 'vue'
export default {
  data() {
    const date = new Date()
    const items = [
      {
        stt: 1,
        day: '20-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 1',
        quantity: '169',
        description: '',
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
        description: '',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
        description: '',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
        description: '',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
        description: '',
      },
      {
        stt: 1,
        day: '20-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 1',
        quantity: '169',
        description: '',
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
        description: '',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
        description: '',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
        description: '',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
        description: '',
      },
      {
        stt: 1,
        day: '20-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 1',
        quantity: '169',
        description: '',
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
        description: '',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
        description: '',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
        description: '',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
        description: '',
      },
    ]
    const columns = [
      { key: 'stt', label: 'STT' },
      { key: 'day', label: 'Ngày' },
      { key: 'farm', label: 'Trại' },
      { key: 'type', label: 'Loại lợn' },
      { key: 'equiment', label: 'Thiết bị' },
      { key: 'quantity', label: 'Số lượng' },
      { key: 'description', label: 'Chi tiết' },
    ]
    const filter = ref('')
    const filterByFields = ref([])
    const customFilteringFn = (source, cellData) => {
      if (!filter.value) {
        return true
      }

      if (filterByFields.value.length >= 1) {
        const searchInCurrentRow = filterByFields.value.some((field) => cellData.column.key === field)
        if (!searchInCurrentRow) return false
      }

      const filterRegex = new RegExp(filter.value, 'i')

      return filterRegex.test(source)
    }
    return {
      date, 
      items,
      columns,
      filter,
      filterByFields,
      customFilteringFn,
    }
  },
  computed: {
    pages() {
      return this.perPage && this.perPage !== 0 ? Math.ceil(this.filtered.length / this.perPage) : this.filtered.length
    },
  },
}
</script>
