<template>
  <div class="newsDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>{{newsTitle}}</div>
    <div v-html="newsContent" class="newsContent"></div>
  </div>
</template>

<script>
import { getNewsDetail } from "@/api/home";
export default {
  name: "newsDetail",
  data() {
    return {
      newsTitle: "",
      newsContent: ""
    };
  },
  mounted() {
    getNewsDetail(this.$route.query.Id).then(res => {
      console.log("res", res.data.news.Content);
      this.newsTitle = res.data.news.Title;
      this.newsContent = res.data.news.Content;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "governmentLed"
      });
    }
  }
};
</script>

<style lang="less">
.newsDetailPage {
  .newsContent {
    text-align: left;
    padding: 10px 20px;
    img {
      width: 100%;
    }
  }
}
</style>