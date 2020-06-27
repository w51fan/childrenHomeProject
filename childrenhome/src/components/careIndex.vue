<template>
  <div style="width:100%;">
    <div class="careIndexTitle">数据统计</div>
    <div class="gap gapfive"></div>
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
import { getTotalCount } from "@/api/home";
export default {
  name: "careIndex",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "careIndex"
    };
  }
};
</script>

<style lang="less">
.gap {
  width: 100%;
  height: 8px;
  background: #e6e6e6;
}
.gapfive {
  height: 2px;
}
.careIndexTitle{
  text-align: left;
  padding: 10px 20px;
}
</style>