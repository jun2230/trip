<!-- detail  -->
<template>
  <div class="detail top-page">
    <van-nav-bar 
      title="房屋详情"
      left-text="路途"
      left-arrow
      @click-left="onClickLeft"
    />

   <div class="main" v-if="mainPart">
     <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
     <Detail_02Infos :top-infos="mainPart.topModule"></Detail_02Infos>
   </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from '@/services'
import { computed, ref } from 'vue';
import DetailSwipe from './cpns/detail_01-swipe.vue'
import Detail_02Infos from './cpns/detail_02-infos.vue';

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const onClickLeft = () => {
  router.back()
}

// 获取请求数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

</script>

<style lang='less' scoped>

</style>