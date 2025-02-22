<template>
  <h1 class="page-title">Bảng số lợn xuất/nhập</h1>
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
    <VaButton class="rounded-[15px] bg-red-300">Tìm kiếm</VaButton>
  </div>
  <VaCard class="mb-6">
    <VaCardContent class="min-h-[250px]">
      <h1 class="text-xl font-bold mb-4">Biểu đồ số lợn xuất/chuồng theo ngày</h1>
      <div class="grid sm:grid-cols-4 gap-3 mb-6">
        <VaInput v-model="filter" placeholder="Filter..." label="Tìm kiếm" />
        <VaInput v-model.number="perPage" type="number" placeholder="Items..." label="Số item trên trang" />
        <!-- <VaInput v-model.number="currentPage" type="number" placeholder="Page..." label="Trang hiện tại" /> -->

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
        sticky-header
        :striped="true"
        hoverable
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        class="table"
        @filtered="filtered = $event.items"
      >
        <template #cell(detail)="{ rowIndex }">
          <VaButton preset="plain" icon="info" @click="handleItem(rowIndex)" />
        </template>
      </VaDataTable>
      <div class="flex justify-center mt-[16px]">
        <VaPagination v-if="filtered.length > 0" v-model="currentPage" :pages="pages" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script>
import { ref } from 'vue'
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
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
      },
      {
        stt: 1,
        day: '20-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 1',
        quantity: '169',
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
      },
      {
        stt: 1,
        day: '20-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 1',
        quantity: '169',
      },
      {
        stt: 2,
        day: '21-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 2',
        quantity: '182',
      },
      {
        stt: 3,
        day: '23-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 3',
        quantity: '153',
      },
      {
        stt: 4,
        day: '24-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 4',
        quantity: '122',
      },
      {
        stt: 5,
        day: '25-2-2025',
        farm: 'Phổ Yên',
        type: 'Lợn nái',
        equiment: 'AI Box 5',
        quantity: '174',
      },
    ]
    const columns = [
      { key: 'stt', label: 'STT', sortable: true },
      { key: 'day', label: 'Ngày', sortable: true },
      { key: 'farm', label: 'Trại', sortable: true },
      { key: 'type', label: 'Loại lợn', sortable: true },
      { key: 'equiment', label: 'Thiết bị', sortable: true },
      { key: 'quantity', label: 'Số lượng', sortable: true },
      { key: 'detail', label: 'Chi tiết', width: 80 },
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
      perPage: 10,
      currentPage: 1,
      filter,
      filterByFields,
      customFilteringFn,
      filtered: items,
    }
  },
  computed: {
    pages() {
      return this.perPage && this.perPage !== 0 ? Math.ceil(this.filtered.length / this.perPage) : this.filtered.length
    },
  },
  methods: {
    handleItem(rowIndex) {
      console.log(rowIndex)
    },
  },
}
</script>
<style lang="scss" scoped>
.table {
  ::v-deep(th) {
    border: 1px solid var(--va-background-border);
    text-align: center;
  }

  ::v-deep(tr) {
    td {
      height: 3rem;
      white-space: normal;
      border: 1px solid var(--va-background-border);
      text-align: center;
    }
  }
}
</style>
