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
    <VaCardContent> </VaCardContent>
  </VaCard>
  <ATable :data-source="dataSource" :columns="columns" />
</template>

<script>
export default {
  setup() {
    return {
      dataSource: [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ],

      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    }
  },
}
</script>
