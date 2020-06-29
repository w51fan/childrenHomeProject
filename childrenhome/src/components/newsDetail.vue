<template>
  <div>
    <div>{{newsTitle}}</div>
    <div v-html="newsContent"></div>
  </div>
</template>

<script>
import { getNewsDetail } from "@/api/home";
export default {
  name: "newsDetail",
  data() {
    return {
      newsTitle: "",
      newsContent: ''
    };
  },
  mounted() {
    getNewsDetail(this.$route.query.Id).then(res => {
      console.log("res", res.data.news.Content);
      this.newsTitle = res.data.news.Title
      this.newsContent = res.data.news.Content
    });
  }
};
</script>

<style>
</style>