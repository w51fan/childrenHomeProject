<template>
  <div class>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="儿童之家">
        <img slot="icon" src="../assets/logo.png" />
        儿童之家
      </mt-tab-item>
      <mt-tab-item id="新闻动态">
        <img slot="icon" src="../assets/logo.png" />
        新闻动态
      </mt-tab-item>
      <mt-tab-item id="线上课程">
        <img slot="icon" src="../assets/logo.png" />
        线上课程
      </mt-tab-item>
      <mt-tab-item id="成长故事">
        <img slot="icon" src="../assets/logo.png" />
        成长故事
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
