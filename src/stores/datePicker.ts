import { defineStore } from 'pinia'

export const useDatePickerStore = defineStore('date-picker', {
  state: () => {
    return {
      startDate: '06/01/2024',
      endDate: '01/31/2025',
    }
  },

  actions: {
    setStartDate(date: string) {
      this.startDate = date
    },
    setEndDate(date: string) {
      this.endDate = date
    },
  },
})
