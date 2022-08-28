<!-- tabbar  -->
<template>
  <div class="tabbar">
    <van-tabbar route active-color="#ff9645">
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/favor" icon="like-o">收藏</van-tabbar-item>
    <van-tabbar-item to="/order" icon="orders-o">订单</van-tabbar-item>
    <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
  </van-tabbar>
  </div>

  
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL} from '@/utils/get_assets_img'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const currentIndex = ref(0)
const router = useRouter()

const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}

</script>

<style lang='less' scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    justify-content:  center;
    flex-direction: column;
    align-items: center;

    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }

    img {
      width: 36px;
    }
  }
}
</style>