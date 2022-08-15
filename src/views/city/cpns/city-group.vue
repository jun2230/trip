<!-- city-group  -->
<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门"/>
      <div class="list">
        <template v-for="(item, index) in groupData.hotCities">
          <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>
    
      <template v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group"></van-index-anchor>
        <template v-for="(city, indey) in item.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)"></van-cell>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>

import useCityStore from '@/stores/modules/city'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const indexList = computed(() => {
  if(props.groupData.cities != undefined) { 
    let data = props.groupData.cities.map(item => item.group)
    data.unshift('#')
     return data
  }
})

// 点击城市
const router = useRouter()
const cityStroe = useCityStore()
const cityClick = (item) => {
  cityStroe.currentCity = item
  router.back()
}
</script>

<style lang='less' scoped>
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    background: #fff4ec;
    color: #000;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    margin: 6px 0;
  }
}
</style>