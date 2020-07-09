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
      <div style="padding: 10px 20px;color: #989898" @click="changeCity">切换城市</div>
    </div>
    <div class="newsList">
      <div v-for="(news,index) in newsList" :key="index">
        <div class="flex" style="padding:10px;" @click="viewDeatil(news)">
          <img
            :src="news.NewsThumbnail"
            style="width:100px;min-width:100px;max-width:100px;height:60px;"
          />
          <div style="text-align: left;padding: 0 10px;position: relative;">
            <div>{{news.Title}}</div>
            <div style="position: absolute;color: #a0a0a0;font-size: 14px;padding: 5px 0;">{{news.CreateTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <assistantBottomNav v-if="isAssistant" :selectedNav.sync="selectedNav"></assistantBottomNav>
    <bottomNav  v-else :selectedNav.sync="selectedNav"></bottomNav>
        <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getList } from "@/api/home";
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
      showOverlay:false
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
    this.showOverlay = true
    this.isAssistant = this.$route.query.isAssistant;
    getList(this.cityId, 1).then(res => {
      this.imgList = res.data.newsList[0].NewsThumbnail.split(",");
      getList(this.cityId, 2).then(result => {
        console.log(result);
        this.tabList = result.data.newsList.reverse();
      }).catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });
      getList(this.cityId, 3).then(news => {
        console.log(news);
        this.newsList = news.data.newsList;
        this.showOverlay = false
      }).catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });
    }).catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });;
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
