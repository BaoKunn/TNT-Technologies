import { defineStore } from 'pinia'

export const useDatePickerStore = defineStore('date-picker', {
  state: () => {
    return {
      startDate: '',
      endDate: '',
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
