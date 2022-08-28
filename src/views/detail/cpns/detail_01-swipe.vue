<!-- swipe  -->
<template>
  <div class="swipe">
     <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <!-- <img :src="item.url" alt=""> -->
          <div class="item-img" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="items" :class="{ active: swipeData[active]?.enumPictureCategory == key}">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">{{getCategoryIndex(swipeData[active])}}/{{value.length}}</span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe> 
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData: Array,
  default: () => []
})

// 对数据进行转换
const swipeGroup = {}
for(const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
console.log(swipeGroup )

// 定义转换数据的方法
const nameReg = /【(.*?)】/i
const getName = (name) => {
  return nameReg.exec(name)[1]
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<style lang='less' scoped>
.swipe {
  .swipe-list {
    .item {

      .item-img {
        width: 100%;
        height: 250px;
        background-size: cover;
      }
      

    }
  }
  
  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    display: flex;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);

    .items {
       margin: 0 3px;

       &.active {
        color: #333;
        background: #fff;
        padding: 0 3px;
        border-radius: 5px;
       }
    }
  }
}
</style>