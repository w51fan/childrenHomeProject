<template>
  <div class="newsDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>{{newsTitle}}</div>
    <div v-html="newsContent" class="newsContent"></div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getNewsDetail } from "@/api/home";
export default {
  name: "newsDetail",
  data() {
    return {
      newsTitle: "",
      newsContent: "",
      showOverlay: true
    };
  },
  mounted() {
    this.showOverlay = true;
    getNewsDetail(this.$route.query.Id)
      .then(res => {
        console.log("res", res.data.news.Content);
        this.newsTitle = res.data.news.Title;
        this.newsContent = res.data.news.Content;
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("getArticleDetail", err);
        this.showOverlay = false;
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