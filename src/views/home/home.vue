<!-- home  -->
<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt=""/>
    </div>
    <home-search-box></home-search-box>
    
  </div>
</template>

<script setup>

import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import hyRequest from '@/services/request/index'
import { ref } from 'vue';
import useHomeStore from '@/stores/modules/home';

// // 热门建议
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()

// const hotSuggests = ref([])
// hyRequest.get({
//   url: "/home/hotSuggests"
// }).then(res => {
//   hotSuggests.value = res.data
// })

// const categories = ref([])
// hyRequest.get({
//   url: "/home/categories"
// }).then(res => {
//   categories.value = res.data
// })

</script>

<style lang='less' scoped>
.home {

  .banner {

    img {
      width: 100%;
    }
  }

  

}
</style>