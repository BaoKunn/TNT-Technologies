import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userId: '',
      roleFarmId: []
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },
    setUserID(id: string) {
      this.userId = id
    },
    setRoleFarmId(farm: []) {
      this.roleFarmId = farm
    }
  },
})
