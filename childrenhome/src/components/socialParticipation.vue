<template>
  <div>
    <van-tabs v-model="selected">
      <van-tab title="最新活动">
        <div class="gap"></div>
        <div class="latestActivity">
          <div style="background-color: #fff;line-height: 48px;">请选择活动类型：</div>
          <van-dropdown-menu active-color="#ee0a24" style="width: 200px;">
            <van-dropdown-item v-model="selectedActivity" :options="activities" />
          </van-dropdown-menu>
        </div>
        <div class="gap gapfive"></div>
      </van-tab>
      <van-tab title="全部活动">
        <div class="gap"></div>
        <div style="display: flex;justify-content: center;">
          <div style="background-color: #fff;line-height: 48px;">
            <van-icon name="location" />
            <span>请选择地区：</span>
          </div>
          <van-dropdown-menu active-color="#ee0a24" style="width: 100px;">
            <van-dropdown-item v-model="selectedActivity" :options="activities" />
          </van-dropdown-menu>
          <van-dropdown-menu active-color="#ee0a24" style="width: 100px;">
            <van-dropdown-item v-model="selectedActivity" :options="activities" />
          </van-dropdown-menu>
        </div>
        <div class="gap gapfive"></div>
      </van-tab>
      <van-tab title="儿童之家">
        <div class="gap"></div>
      </van-tab>
    </van-tabs>

    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import { getActivityList } from "@/api/home";
import bottomNav from "./bottomNav";
export default {
  name: "socialParticipation",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedActivity: 0,
      selectedNav: "socialParticipation",
      activities: [
        { text: "请选择", value: 0 },
        { text: "线下活动", value: 1 },
        { text: "线上活动", value: 2 }
      ]
    };
  },
  mounted() {
    // getActivityList({
    //   cityId: "",
    //   areaId: "",
    //   townId: "",
    //   activityType: ""
    // }).then(res => {});
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
};
</script>

<style lang="less"  scoped>
.latestActivity {
  display: flex;
  justify-content: center;
}
/deep/.van-dropdown-menu__bar {
  box-shadow: none;
}

.gap {
  width: 100%;
  height: 8px;
  background: #e6e6e6;
}
.gapfive {
  height: 2px;
}
</style>

