<template>
  <div class="bottomNavPage">
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
  name: "bottomNav",
  props: ["selectedNav"],
  data() {
    return {
      active: "governmentLed",
      navList: [
        {
          navName: "政府主导",
          icon: "wap-home",
          path: "governmentLed"
        },
        {
          navName: "社会参与",
          icon: "invition",
          path: "socialParticipation"
        },
        {
          navName: "家庭尽责",
          icon: "friends",
          path: "familyResponsibility"
        },
        {
          navName: "关爱指数",
          icon: "fire",
          path: "careIndex"
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
        name: this.active
      });
      return this.selectedNav;
    }
  }
};
</script>

<style lang="less">
.bottomNavPage {
}
</style>