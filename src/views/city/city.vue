<!-- city  -->
<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <div class="top">
      <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      ></van-search>
   </div>
    <!-- tab的切换 -->
    <van-tabs v-model:active="tabActive">
      <template v-for="(value, key, index) in allCities" :key="key">
        <van-tab :title="value.title" :name="key"></van-tab>
      </template>
    </van-tabs>
    <div class="content">
      <city-group :group-data="currentGroup"></city-group>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCityAll } from '@/services'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia';

import  CityGroup  from './cpns/city-group.vue'

const router = useRouter()  
const searchValue = ref("")

// 搜索框
const cancelClick = () => {
  router.back()
}

// tab 的切换
const tabActive = ref("")

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 标签选取后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])
const itemClick = (value) => {
  console.log(value)
}

</script>

<style lang='less' scoped>
.city {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;

  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 104px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}
</style>