import { TLineChartData } from '../types'

export const lineChartDataTotal: TLineChartData = {
  labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
  datasets: [
    {
      label: 'Số lượng trong chuồng',
      borderColor: 'rgba(184, 17, 142, 0.4)',
      data: [50, 80, 30, 50, 10, 60, 10], // Random values
    },
  ],
}
