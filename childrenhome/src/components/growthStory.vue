<template>
  <div class="growthStoryPage">
    <!-- <div>
      <van-loading type="spinner" />
    </div>-->
    <van-tabs v-model="selected">
      <van-tab title="家长说">
        <div class="gap"></div>
        <div class="Content">
          <div v-for="(article,index) in articlelist" :key="index" class="ContentItem">
            <!-- <div v-html="article.Content" class=""></div> -->
            <img :src="article.NewsThumbnail" alt />
            <div class="articleTitle">
              <div>{{article.Title}}</div>
              <div class="gray">{{getDate(article.CreateTime)}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="志愿者说">
        <div class="gap"></div>
        <div class="Content">
          <div v-for="(article,index) in articlelist" :key="index" class="ContentItem">
            <!-- <div v-html="article.Content" class=""></div> -->
            <img :src="article.NewsThumbnail" alt />
            <div class="articleTitle">
              <div>{{article.Title}}</div>
              <div class="gray">{{getDate(article.CreateTime)}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="美丽心灵">
        <div class="gap"></div>
        <div class="Content">
          <div v-for="(article,index) in articlelist" :key="index" class="ContentItem">
            <!-- <div v-html="article.Content" class=""></div> -->
            <img :src="article.NewsThumbnail" alt />
            <div class="articleTitle">
              <div>{{article.Title}}</div>
              <div class="gray">{{getDate(article.CreateTime)}}</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <assistantBottomNav v-if="isAssistant" :selectedNav.sync="selectedNav"></assistantBottomNav>
    <bottomNav v-else :selectedNav.sync="selectedNav"></bottomNav>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
import assistantBottomNav from "./assistantBottomNav";
import { getArticleList } from "@/api/home";
export default {
  name: "growthStory",
  components: {
    bottomNav,
    assistantBottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "growthStory",
      articlelist: [],
      isAssistant: false,
      showOverlay: false
    };
  },
  watch: {
    selected(val) {
      this.articlelist = [];
      getArticleList(this.cityId, val + 1).then(res => {
        console.log("getArticleList", res);
        this.articlelist = res.data.articlelist;
      });
    }
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  mounted() {
    this.showOverlay = true;
    this.isAssistant = this.$route.query.isAssistant;
    getArticleList(this.cityId, 1)
      .then(res => {
        console.log("getArticleList", res);
        this.articlelist = res.data.articlelist;
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("getTotalCount", err);
        this.showOverlay = false;
      });
  },
  methods: {
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

<style lang="less" >
.growthStoryPage {
  margin-bottom: 50px;
  background: #e6e6e6;
  .Content {
    padding: 20px;
    img {
      width: 100%;
    }
    .ContentItem {
      background: #fff;
      margin-bottom: 20px;
      box-shadow: 0px 0px 10px 5px rgba(175, 175, 175, 0.5);
      .articleTitle {
        text-align: left;
        padding: 5px 20px;
        .gray {
          font-size: 14px;
          color: #a0a0a0;
        }
      }
    }
  }
}
</style>