import { defineStore } from "pinia";
import { getHomeHotSuggests } from "@/services"

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      console.log(res)
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore