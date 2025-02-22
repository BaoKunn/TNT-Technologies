<script>
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataSection = defineStore('data-section', () => {
  const items = ref([
    {
      id: 'openInvoices',
      title: 'Xuất chuồng',
      value: '519',
      icon: 'mso-attach_money',
      changeText: '$1, 450',
      changeDirection: 'down',
      iconBackground: 'blue',
      iconColor: 'blue',
    },
    {
      id: 'ongoingProjects',
      title: 'Nhập chuồng',
      value: '4913',
      icon: 'mso-folder_open',
      changeText: '25.36%',
      changeDirection: 'up',
      iconBackground: 'purple',
      iconColor: 'purple',
    },
    {
      id: 'employee',
      title: 'Nhập trả lại',
      value: '244',
      icon: 'mso-account_circle',
      changeText: '2.5%',
      changeDirection: 'up',
      iconBackground: 'red',
      iconColor: 'red',
    },
    {
      id: 'employees',
      title: 'Trong chuồng',
      value: '76',
      icon: 'mso-account_circle',
      changeText: '2.5%',
      changeDirection: 'up',
      iconBackground: 'green',
      iconColor: 'green',
    },
  ])

  return { items }
})
</script>
