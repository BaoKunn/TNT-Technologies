import { defineStore } from 'pinia'

export const useYearlyStore = defineStore('yearly', {
  state: () => {
    return {
      labels: [],
      data: [],
      dataMonth: [],
      totalRefund: 0,
      totalInGate: 0 
    }
  },

  actions: {
    setLabels(labels: never[]) {
      this.labels = labels
    },
    setData(data: never[]) {
      this.data = data
    },
    setDataMonth(data: never[]) {
      this.dataMonth = data
    },
    setTotalRefund(data: number) {
      this.totalRefund = data
    },
    setTotalInGate(data: number) {
      this.totalInGate = data
    },
  },
})
