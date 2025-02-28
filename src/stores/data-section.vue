<script>
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useMonthStore } from './monthlyEaring';
import { useYearlyStore } from './yearlyBreakup';

export const useDataSection = defineStore('data-section', () => {
  const storeMonthly = useMonthStore()
  const storeYearly = useYearlyStore()
  const items = ref([
    {
      id: 'openInvoices',
      title: 'Xuất chuồng',
      value: storeMonthly.totalOut,
      icon: 'mso-attach_money',
      changeText: '$1, 450',
      changeDirection: 'down',
      iconBackground: 'blue',
      iconColor: 'blue',
    },
    {
      id: 'ongoingProjects',
      title: 'Nhập chuồng',
      value: storeMonthly.totalIn,
      icon: 'mso-folder_open',
      changeText: '25.36%',
      changeDirection: 'up',
      iconBackground: 'purple',
      iconColor: 'purple',
    },
    {
      id: 'employee',
      title: 'Nhập trả lại',
      value: storeYearly.totalRefund,
      icon: 'mso-account_circle',
      changeText: '2.5%',
      changeDirection: 'up',
      iconBackground: 'red',
      iconColor: 'red',
    },
    {
      id: 'employees',
      title: 'Trong chuồng',
      value: storeYearly.totalInGate,
      icon: 'mso-account_circle',
      changeText: '2.5%',
      changeDirection: 'up',
      iconBackground: 'green',
      iconColor: 'green',
    },
  ])

  watch(
    () => storeMonthly.totalOut,
    (newValue) => {
      const openInvoices = items.value.find(item => item.id === 'openInvoices');
      if (openInvoices) {
        openInvoices.value = newValue;  // Update the value for 'Xuất chuồng'
      }
    }
  );

  watch(
    () => storeMonthly.totalIn,
    (newValue) => {
      const ongoingProjects = items.value.find(item => item.id === 'ongoingProjects');
      if (ongoingProjects) {
        ongoingProjects.value = newValue;  // Update the value for 'Nhập chuồng'
      }
    }
  );

  watch(
    () => storeYearly.totalRefund,
    (newValue) => {
      const employee = items.value.find(item => item.id === 'employee');
      if (employee) {
        employee.value = newValue;  // Update the value for 'Nhập trả lại'
      }
    }
  );

  watch(
    () => storeYearly.totalInGate,
    (newValue) => {
      const employees = items.value.find(item => item.id === 'employees');
      if (employees) {
        employees.value = newValue;  // Update the value for 'Nhập trả lại'
      }
    }
  );

  return { items }
})

// watch(
//   [() => storeMonthly.totalOut],  // Watch both properties
//   async (newRoleFarmId) => {  // Destructure the new values
//     if (newRoleFarmId) {
//       await fetchData(newRoleFarmId);  // Fetch data again with the new roleFarmId
//     }
//   },
//   { immediate: true }  // Call immediately on mount as well
// )
</script>
