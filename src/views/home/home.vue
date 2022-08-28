<!-- home  -->
<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt=""/>
    </div>
    <home-search-box></home-search-box>
    <HomeCategories></HomeCategories>

    <div class="search-bar" v-show="showSearchBar">
      <searchBar></searchBar>
    </div>
    
    <home-content></home-content>
  </div>
</template>

<script setup>

import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import searchBar from '@/components/search-bar/index.vue'
import useHomeStore from '@/stores/modules/home';
import homeCatefories from "./cpns/home-categories.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import { onMounted, onUnmounted, watch, ref, computed } from 'vue';

import useScroll from '@/hooks/useScroll'
import SearchBar from '../../components/search-bar/index.vue'

// // 热门建议
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()



// 加载更多
const moreBntClick = () => {
  console.log("加载更多")
  homeStore.fetchHouseListData()
}

// 监听window滚动
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if(newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
const showSearchBar = computed(() => {
  return scrollTop.value >= 360
})

</script>

<style lang='less' scoped>
.home {
  padding-bottom: 50px;
}

.banner {
  img {
    width: 100%;
  }
}

.content {
  margin-top: 20px;
  background-color: #f5f7f9;
}

.home-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 16px 10px 16px;
  background-color: white;
  z-index: 100;
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background: #fff;
  z-index: 9;
}
</style>