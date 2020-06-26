<template>
  <div>
    careIndex
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
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

<style>
</style>