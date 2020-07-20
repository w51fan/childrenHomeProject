<template>
  <div class="governmentLedPage">
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img,index) in imgList" :key="index">
          <img :src="img" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="gap"></div>
    <div class="tabList">
      <div class="tab" v-for="(tab,index) in tabList" :key="index">
        <div class="tabItem" :class="[index===0||index===2?'right':'']" @click="viewDeatil(tab)">
          <img :src="tab.NewsThumbnail" alt class="tabItemImg" />
          <div>
            <div style="line-height: 40px;padding-left: 10px;font-weight: 600;">{{tab.Title}}</div>
            <div style="line-height: 5px;font-size: 14px;color: #989898;">{{tab.Title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="flex space-between newsTitle">
      <div style="padding: 10px 20px;">新闻资讯</div>
      <div style="padding: 10px 20px;color: #989898" @click="changeCity" v-if="!isAssistant">切换城市</div>
    </div>
    <div class="newsList">
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(news,index) in newsList" :key="index">
            <div class="flex" style="padding:10px;" @click="viewDeatil(news)">
              <img
                :src="news.NewsThumbnail"
                style="width:100px;min-width:100px;max-width:100px;height:60px;"
              />
              <div style="text-align: left;padding: 0 10px;position: relative;">
                <div>{{news.Title}}</div>
                <div
                  style="position: absolute;color: #a0a0a0;font-size: 14px;padding: 5px 0;"
                >{{news.CreateTime}}</div>
              </div>
            </div>
          </div>
        </van-list>
      <!-- </van-pull-refresh> -->
    </div>
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
import {
  getHomeImgList,
  getMenuList,
  getNewsList,
  getGoveList
} from "@/api/home";
import bottomNav from "./bottomNav";
import assistantBottomNav from "./assistantBottomNav";
export default {
  name: "governmentLed",
  components: {
    bottomNav,
    assistantBottomNav
  },
  data() {
    return {
      selectedNav: "governmentLed",
      imgList: [],
      tabList: [],
      newsList: [],
      isAssistant: false,
      showOverlay: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: ""
    };
  },
  watch: {
    selectedNav(val) {
      console.log(val);
      this.$router.push({
        name: val
      });
    }
  },
  mounted() {
    if (this.$route.query.User && this.$route.query.UserTpye) {
      this.$store.commit("common/getUserTpye", this.$route.query.UserTpye);
      this.$store.commit("common/getUser", this.$route.query.User);
    }
    if (!this.Token) {
      this.$store.commit(
        "common/getToken",
        window.localStorage.getItem("Token")
      );
    }
    this.showOverlay = true;
    this.isAssistant = this.$route.query.isAssistant;
    getHomeImgList(this.cityId)
      .then(res => {
        this.imgList = res.data.newsList[0].NewsThumbnail.split(",");
        getMenuList(this.cityId)
          .then(result => {
            console.log(result);
            this.tabList = result.data.newsList.reverse();
          })
          .catch(err => {
            console.log("err", err);
            this.showOverlay = false;
          });
        getNewsList(this.cityId, this.pageNumber, this.pageSize)
          .then(news => {
            console.log(news);
            this.newsList = news.data.newsList;
            this.total = news.data.total;
            this.showOverlay = false;
          })
          .catch(err => {
            console.log("err", err);
            this.showOverlay = false;
          });
      })
      .catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });
  },
  computed: {
    cityId() {
      console.log("his.$store.state", this.$store.state);
      return this.$store.state.common.cityId;
    }
  },
  methods: {
    viewDeatil(row) {
      this.$router.push({
        name: "newsDetail",
        query: {
          Id: row.Id
        }
      });
    },
    changeCity() {
      this.$router.push({
        name: "changeCityPage",
        query: {
          needComeBack: true
        }
      });
    },
    getNewsList(param) {
      const {cityId, pageNumber, pageSize} =param
      getNewsList(cityId,pageNumber,pageSize)
        .then(res => {
          // console.log(news);
          res.data.newsList.forEach(item => {
              this.newsList.push(item);
            });
            this.loading = false;
            this.showOverlay = false;
            if (!(this.newsList.length < this.total)) this.finished = true;
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
    onLoad() {
      // console.log('123456')
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
      }
      // console.log('this.newsList.length',this.newsList.length)
      if (this.newsList.length < this.total) {
        this.getNewsList({
          cityId: this.cityId,
          pageNumber: this.pageNumber++ + 1,
          pageSize: this.pageSize,
        });
      } else {
        // this.finished = true;
      }
      this.loading = false;
    },
    onRefresh() {
      // console.log('123')
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="less">
.governmentLedPage {
  .swipe {
    width: 100%;
    height: 150px;
  }
  .swipeImg {
    width: 100%;
    height: 150px;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .newsList {
    margin-bottom: 60px;
  }
  .tabList {
    display: flex;
    flex-wrap: wrap;
  }
  .tabItem {
    display: flex;
    padding: 10px 20px;
    /* border-bottom: 1px solid #e6e6e6; */
  }
  .right {
    border-right: 1px solid #e6e6e6;
  }
  .tabItemImg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .tab {
    width: 50%;
    flex: 1;
    min-width: 50%;
    max-width: 50%;
    border-bottom: 1px solid #e6e6e6;
  }
  .newsTitle {
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>
