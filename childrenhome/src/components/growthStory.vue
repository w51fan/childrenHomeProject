<template>
  <div class="growthStoryPage">
    <!-- <div>
      <van-loading type="spinner" />
    </div>-->
    <van-tabs v-model="selected">
      <van-tab title="家长说">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <img :src="article.NewsThumbnail" alt />
                <div class="articleTitle">
                  <div>{{article.Title}}</div>
                  <div class="gray">{{getDate(article.CreateTime)}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="志愿者说">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <img :src="article.NewsThumbnail" alt />
                <div class="articleTitle">
                  <div>{{article.Title}}</div>
                  <div class="gray">{{getDate(article.CreateTime)}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="美丽心灵">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <img :src="article.NewsThumbnail" alt />
                <div class="articleTitle">
                  <div>{{article.Title}}</div>
                  <div class="gray">{{getDate(article.CreateTime)}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
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
      showOverlay: false,
      showList: true,
      articleContent: "",
      articleTitle: "",
      loading: false,
      finished: false,
      refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: ""
    };
  },
  watch: {
    selected(val) {
      this.articlelist = [];
      this.pageNumber = 1;
      this.loading = false;
      this.finished = false;
      this.refreshing = false;
      getArticleList(this.cityId, val + 1, this.pageNumber, this.pageSize)
        .then(res => {
          console.log("getArticleList1", res);
          this.articlelist = res.data.articlelist;
          this.total = res.data.total;
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("getTotalCount", err);
          this.showOverlay = false;
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
    // getArticleList(this.cityId, 1, this.pageNumber, this.pageSize)
    //   .then(res => {
    //     console.log("getArticleList", res);
    //     this.articlelist = res.data.articlelist;
    //     this.total = res.data.total;
    //     this.showOverlay = false;
    //   })
    //   .catch(err => {
    //     console.log("getTotalCount", err);
    //     this.showOverlay = false;
    //   });
  },
  methods: {
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    viewDetail(row) {
      this.$router.push({
        name: "articleDetail",
        query: {
          id: row.Id,
          currentPath: "growthStory"
        }
      });
    },
    getArticleList(cityId, type, pageNumber, pageSize) {
      getArticleList(cityId, type, pageNumber, pageSize)
        .then(res => {
          console.log("getArticleList", res);
          res.data.articlelist.forEach(item => {
            this.articlelist.push(item);
          });
          this.loading = false;
          this.showOverlay = false;
          if (!(this.articlelist.length < this.total)) this.finished = true;
        })
        .catch(err => {
          console.log("getArticleList", err);
          this.showOverlay = false;
        });
    },
    onLoad() {
      if (this.refreshing) {
        // this.articlelist = [];
        this.refreshing = false;
      }
      if (this.articlelist.length < this.total) {
        this.getArticleList(
          this.cityId,
          this.selected + 1,
          this.pageNumber++ + 1,
          this.pageSize
        );
      } else {
        // this.finished = true;
      }
      this.loading = false;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      console.log("22");
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
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