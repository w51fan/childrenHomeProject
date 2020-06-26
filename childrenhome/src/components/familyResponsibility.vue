<template>
  <div>
    familyResponsibility
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