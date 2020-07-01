<template>
  <div class="changeCityPage">
    <van-nav-bar v-if="needComeBack" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>请选择你所在的地区</div>
    <div>
      <div
        v-for="(city,index) in cityList"
        :key="index"
        class="cityItem"
        @click="selectedCity(city)"
      >
        <van-button type="primary" color="#04b939" style="width:100%;">{{city.Name}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityList } from "@/api/home";
export default {
  name: "changeCityPage",
  data() {
    return {
      cityList: [],
      needComeBack: false
    };
  },
  mounted() {
    if (this.$route.query.needComeBack) this.needComeBack = true;
    getCityList().then(res => {
      console.log("getCityList", res);
      this.cityList = res.data.cityList;
    });
  },
  methods: {
    selectedCity(city) {
      this.$store.commit("common/getCityId", city.Id);
      this.$router.push({
        name: "ennterPage"
      });
    },
    onClickLeft() {
      this.$router.push({
        name: "governmentLed"
      });
    }
  }
};
</script>

<style lang="less">
.changeCityPage {
  .cityItem {
    padding: 20px 20px 0;
  }
}
</style>