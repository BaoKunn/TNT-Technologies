import { defineStore } from 'pinia'

export const useMonthStore = defineStore('monthly', {
  state: () => {
    return {
      labels: [],
      dataIn: [],
      dataOut: [],
      dataInMonth: [],
      dataOutMonth: []
    }
  },

  actions: {
    setLabels(labels: never[]) {
      this.labels = labels
    },
    setDataIn(data: never[]) {
      this.dataIn = data
    },
    setDataOut(data: never[]) {
      this.dataOut = data
    },
    setDataInMonth(data: never[]) {
      this.dataInMonth = data
    },
    setDataOutMonth(data: never[]) {
      this.dataOutMonth = data
    }
  },
})
