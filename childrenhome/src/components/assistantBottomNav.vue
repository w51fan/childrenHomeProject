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
      navList: []
    };
  },
  computed: {
    UserTpye() {
      return this.$store.state.common.UserTpye;
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    active(val) {
      this.$emit("update:selectedNav", this.selectedNav);
      this.$router.push({
        name: this.active,
        query: {
          isAssistant: true
        }
      });
      return this.selectedNav;
    }
  },
  methods: {
    init() {
      this.active = this.selectedNav;
      console.log("this.UserTpye", this.UserTpye);
      if (this.UserTpye === 4 || this.UserTpye === 11 ||this.UserTpye === 12) {
        this.navList = [
          {
            navName: this.UserTpye === 4|| this.UserTpye === 11 ? "儿童之家" : "服务站",
            icon: "wap-home",
            path: this.UserTpye === 4|| this.UserTpye === 11 ? "childrenHomePage" : "socialWorkstation",
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
        ];
      } else {
        this.navList = [
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
        ];
      }
    }
  }
};
</script>

<style lang="less">
.assistantBottomNavPage {
}
</style>