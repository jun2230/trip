<template>
  <div class="id">
    <router-view></router-view>
    <tabbar v-if="!route.meta.hideTabBar"></tabbar>
    <Loading></Loading>
  </div>
</template>

<script setup>

import tabbar from "@/components/tabbar/tabbar.vue";
import { useRoute } from "vue-router";
import Loading from "./components/loading/index.vue";

const route = useRoute()

</script>

<style scoped>

</style>
