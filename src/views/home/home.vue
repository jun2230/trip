<!-- home  -->

  components: { homeNavBar },<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" />
    </div>
    <div class="location">
      <div class="city">广州</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import homeNavBar from './cpns/home-nav-bar.vue';
import homeNavBarVue from './cpns/home-nav-bar.vue';
</script>

<style lang='less' scoped>
.home {

  .banner {

    img {
      width: 100%;
    }
  }

  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;
      
      .text {
        position: relative;
        top: 2px;
        font-size: 12px;
      }


      img {
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }

    
  }

}
</style>