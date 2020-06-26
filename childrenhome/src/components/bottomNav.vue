<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item :id="nav.path" v-for="(nav,index) in  navList" :key="index">
        <img slot="icon" :src="nav.icon" />
        {{nav.navName}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "bottomNav",
  props: ["selectedNav"],
  data() {
    return {
      selected: "governmentLed",
      navList: [
        {
          navName: "政府主导",
          icon: require("../assets/logo.png"),
          path: "governmentLed"
        },
        {
          navName: "社会参与",
          icon: require("../assets/logo.png"),
          path: "socialParticipation"
        },
        {
          navName: "家庭尽责",
          icon: require("../assets/logo.png"),
          path: "familyResponsibility"
        },
        {
          navName: "关爱指数",
          icon: require("../assets/logo.png"),
          path: "careIndex"
        },
        {
          navName: "成长故事",
          icon: require("../assets/logo.png"),
          path: "growthStory"
        }
      ]
    };
  },
  mounted() {
    this.selected = this.selectedNav;
    console.log("this.selected", this.selected);
    //   this.$emit('update:selectedNav',this.selectedNav)
    //   this.$router.push({
    //     name:this.selected
    //   })
  },
  watch: {
    selected(val) {
      console.log(val);
      this.$emit("update:selectedNav", this.selectedNav);
      this.$router.push({
        name: this.selected
      });
      return this.selectedNav;
    }
  }
};
</script>

<style>
</style>