<!-- home  -->
<template>
  <div class="home">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef">

      </div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/index.vue"
import { onMounted, ref } from "vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()
const map = ref()
function initMap() {
  map.value = new BMap.Map(mapRef.value);
  let point = new BMap.Point(props.position.longitude, props.position.latitude);
  
  map.value.centerAndZoom(point, 20);
  const marker = new BMap.Marker(point);
  map.value.addOverlay(marker)
}

onMounted(() => {
  initMap()
})

</script>

<style lang='less' scoped>
.baidu {
  height: 250px;
}
</style>