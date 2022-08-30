<!-- detail  -->
<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl class="tabs" 
                :titles="['abc', 'cba', 'nba', 'cba', 'nmd']"
                v-if="showTabControl"
                @itemClick="tabClick"
    ></TabControl>
    <van-nav-bar 
      title="房屋详情"
      left-text="路途"
      left-arrow
      @click-left="onClickLeft"
    />

   <div class="main" v-if="mainPart">
     <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
     <Detail_02Infos :top-infos="mainPart.topModule"></Detail_02Infos>
     <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
     <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
     <detail-comment :comment="mainPart.dynamicModule.commentModule"></detail-comment>
     <detail-notice :orderRules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
     <detail-map></detail-map>
     <detail-intro :intro="mainPart.introductionModule"></detail-intro>
   </div>

   <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from '@/services'
import { computed, ref } from 'vue';
import TabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import Detail_02Infos from './cpns/detail_02-infos.vue';
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import useScroll from '@/hooks/useScroll';

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

// tabControl 相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})

const tabClick = (index) => {
  detailRef.value.scrollTo({
    top: (index + 1) * 200,
    behavior: "smooth"
  })
}

</script>

<style lang='less' scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}

.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
</style>