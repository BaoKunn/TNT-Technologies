import { defineStore } from 'pinia'

export const useMonthStore = defineStore('monthly', {
  state: () => {
    return {
      labels: [],
      data: []
    }
  },

  actions: {
    setLabels(labels: never[]) {
      this.labels = labels
    },
    setData(data: never[]) {
      this.data = data
    }
  },
})
