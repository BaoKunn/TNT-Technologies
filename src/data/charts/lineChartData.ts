import { TLineChartData } from '../types'

export const lineChartData: TLineChartData = {
  labels: [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
    'Chủ Nhật'
  ],
  datasets: [
    {
      label: 'Nhập chuồng',
      data: [10, 35, 80, 20, 30, 60, 10], // Random values
    },
    {
      label: 'Xuất chuồng',
      data: [20, 45, 30, 50, 80, 20, 40], // Random values
    },
    
  ],
}
