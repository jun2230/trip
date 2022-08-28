import { defineStore } from "pinia";

const startData = new Date()
const endDate = new Date()
endDate.setDate(startData.getDate() + 1)

const useMainStore = defineStore('main', {
  state: () => ({
    startDate: startData,
    endDate: endDate,
    isLoading: true
  })
})

export default useMainStore