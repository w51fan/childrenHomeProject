<template>
  <div>
    <van-tabs v-model="selected">
      <van-tab title="家长说">
        <div class="gap"></div>
        
      </van-tab>
      <van-tab title="志愿者说">
        <div class="gap"></div>
      </van-tab>
      <van-tab title="美丽心灵">
        <div class="gap"></div>
      </van-tab>
    </van-tabs>
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
export default {
  name: "growthStory",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "growthStory"
    };
  }
};
</script>

<style>
</style>