<template>
  <div>
    <div>家庭教育系列课程</div>
    <div>课程列表</div>
    <div></div>
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
export default {
  name: "familyResponsibility",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "familyResponsibility"
    };
  }
};
</script>

<style>
</style>