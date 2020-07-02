<template>
  <div class="assistantBottomNavPage">
    <van-tabbar v-model="active">
      <van-tabbar-item
        :name="nav.path"
        :icon="nav.icon"
        v-for="(nav,index) in  navList"
        :key="index"
      >{{nav.navName}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "assistantBottomNav",
  props: ["selectedNav"],
  data() {
    return {
      active: "childrenHomePage",
      navList: [
        {
          navName: "儿童之家",
          icon: "wap-home",
          path: "childrenHomePage"
        },
        {
          navName: "新闻动态",
          icon: "invition",
          path: "governmentLed"
        },
        {
          navName: "线下活动",
          icon: "friends",
          path: "offlineActivity"
        },
        {
          navName: "线上课程",
          icon: "fire",
          path: "familyResponsibility"
        },
        {
          navName: "成长故事",
          icon: "smile",
          path: "growthStory"
        }
      ]
    };
  },
  mounted() {
    this.active = this.selectedNav;
  },
  watch: {
    active(val) {
      this.$emit("update:selectedNav", this.selectedNav);
      this.$router.push({
        name: this.active,
        query:{
          isAssistant:true
        }
      });
      return this.selectedNav;
    }
  }
};
</script>

<style lang="less">
.assistantBottomNavPage {
}
</style>