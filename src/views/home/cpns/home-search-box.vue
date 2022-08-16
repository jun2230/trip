<!-- search-box  -->
<template>
  <div class="search-box ">
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png"/>
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="item date-range bottom-gray-line">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time" @click="dateClick"> {{startDate}} </span>
        </div>
        <div class="stay">共{{stayCount}}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time" @click="dateClick"> {{endDate}} </span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm"
      ></van-calendar>

    <div class="item price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>
    <div class="item hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <span class="tag">{{ item.tagText.text }}</span>
      </template>
    </div>

    <div class="item search-btn">
      <div class="btn" @click="startSearch">开始搜索</div>
    </div>

  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import { ref } from 'vue';
import useHomeStore from "@/stores/modules/home"

const router = useRouter()

// 定义props
// defineProps({
//   hotSuggests:{
//     type: Array,
//     default: () => []
//   }
// })

// 位置 城市
const cityClick = () => {
  router.push('/city')
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('获取位置成功', res)
  }, err => {
    console.log("获取位置失败", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

// 获取当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期范围处理
const nowDate = new Date()
const newDate = nowDate.setDate(nowDate.getDate() + 1)
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(nowDate.setDate(nowDate.getDate() + 1)))

const stayCount = ref(getDiffDays(newDate, nowDate ))


// 日历
const showCalendar = ref(false)
const onConfirm = (value) => {
  const selectStarDate = value[0]
  const selectEndDate = value[1]
  startDate.value = formatMonthDay(selectStarDate)
  endDate.value = formatMonthDay(selectEndDate)
  stayCount.value = ref(getDiffDays(selectStarDate, selectEndDate))
  showCalendar.value = false
}

// 打开时间选择
const dateClick = () => {
  showCalendar.value = true
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

</script>

<style lang='less' scoped>

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
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

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  height: 44px;
  .start {
    border-right: 1px solid #f8f7f6;
  }
}

.keyword {
  height: 44px;
}

.hot-suggest {
  margin: 10px 0;

  .tag {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    color: #3f4954;
    background-color: #f1f3f5;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(
      --tjc-theme-linear-gradient,
      linear-gradient(90deg, #fa8c1d, #fcaf3f)
    );
  }
}

.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>