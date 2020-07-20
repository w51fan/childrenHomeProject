<template>
  <div class="articleDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <div class="title">{{articleTitle}}</div>
      <div class="time">{{getDate(CreateTime)}}</div>
      <div style="padding:20px;text-align: left;" v-html="articleContent"></div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/home";
export default {
  name: "articleDetail",
  data() {
    return {
      articleTitle: "",
      articleContent: "",
      CreateTime: ""
    };
  },
  mounted() {
    getArticleDetail(this.$route.query.id).then(res => {
      this.showList = false;
      console.log("getArticleDetail", res);
      this.articleTitle = res.data.article.Title;
      this.CreateTime = res.data.article.CreateTime;
      this.articleContent = res.data.article.Content;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath
      });
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    }
  }
};
</script>

<style lang="less">
.articleDetailPage {
  img {
    width: 100%;
  }
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: left;
    padding: 20px 20px 0px;
  }
  .time {
    font-size: 12px;
    color: #a0a0a0;
    text-align: left;
    padding: 5px 20px;
  }
}
</style>