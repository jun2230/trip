<template>
  <div class="id">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script setup>

import tabbar from "@/components/tabbar/tabbar.vue";
import { useRoute } from "vue-router";

const route = useRoute()

</script>

<style scoped>

</style>
