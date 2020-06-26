<template>
  <div>
    growthStory
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