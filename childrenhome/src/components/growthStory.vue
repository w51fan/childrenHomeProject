<template>
  <div class="growthStoryPage">
    <!-- <div>
      <van-loading type="spinner" />
    </div>-->
    <van-tabs v-model="selected">
      <van-tab title="家长说">
        <div class="gap"></div>
        <div>
          <div v-for="(article,index) in articlelist" :key="index">
            <div v-html="article.Content" class="Content"></div>
          </div>
        </div>
      </van-tab>
      <van-tab title="志愿者说">
        <div class="gap"></div>
        <div>
          <div v-for="(article,index) in articlelist" :key="index">
            <div v-html="article.Content" class="Content"></div>
          </div>
        </div>
      </van-tab>
      <van-tab title="美丽心灵">
        <div class="gap"></div>
        <div>
          <div v-for="(article,index) in articlelist" :key="index">
            <div v-html="article.Content" class="Content"></div>
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
  methods: {}
};
</script>

<style lang="less" >
.growthStoryPage {
  .Content {
    img {
      width: 100%;
    }
  }
}
</style>