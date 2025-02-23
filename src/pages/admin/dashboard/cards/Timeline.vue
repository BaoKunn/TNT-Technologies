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

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase text-lg text-black">Bảng số lượng lợn trong chuồng</h1>
      <!-- <VaButton preset="primary" size="small" to="/projects">View all projects</VaButton> -->
    </VaCardTitle>
    <VaCardContent>
      <ATable :data-source="dataSource" :columns="columns" bordered />
    </VaCardContent>
  </VaCard>
</template>
