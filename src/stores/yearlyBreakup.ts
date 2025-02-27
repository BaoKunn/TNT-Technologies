import { defineStore } from 'pinia'

export const useYearlyStore = defineStore('yearly', {
  state: () => {
    return {
      labels: [],
      data: [],
      dataMonth: []
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
    }
  },
})
