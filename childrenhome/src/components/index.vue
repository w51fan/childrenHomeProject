<template>
  <div>
    <div class="swipe">
      <!-- <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(img,index) in imgList" :key="index">
          <img :src="img" alt class="swipeImg" />
        </mt-swipe-item>
      </mt-swipe>-->
      <van-swipe  class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item  v-for="(img,index) in imgList"  :key="index">
          <img :src="img" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="gap"></div>
    <div class="tabList">
      <div class="tab" v-for="(tab,index) in tabList" :key="index">
        <div class="tabItem" :class="[index===0||index===2?'right':'']">
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
      <div style="padding: 10px 20px;color: #989898">切换城市</div>
    </div>
    <div class="newsList">
      <div v-for="(news,index) in newsList" :key="index">
        <div class="flex" style="padding:10px;" @click="viewDeatil(news)">
          <img
            :src="news.NewsThumbnail"
            style="width:100px;min-width:100px;max-width:100px;height:60px;"
          />
          <div style="text-align: left">
            <div>{{news.Title}}</div>
            <div>{{news.CreateTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <mt-tabbar v-model="selectedNav" fixed>
      <mt-tab-item :id="nav.path"  v-for="(nav,index) in  navList" :key="index" >
        <img slot="icon" :src="nav.icon"  />
        {{nav.navName}}
      </mt-tab-item>
    </mt-tabbar>-->
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import { getList } from "@/api/home";
import bottomNav from "./bottomNav";

export default {
  name: "governmentLed",
  components: {
    bottomNav
  },
  data() {
    return {
      selectedNav: "governmentLed",
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
      ],
      imgList: [],
      tabList: [],
      newsList: []
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
    getList(2018, 1).then(res => {
      this.imgList = res.data.newsList[0].NewsThumbnail.split(",");
      getList(2018, 2).then(result => {
        console.log(result);
        this.tabList = result.data.newsList.reverse();
      });
      getList(2018, 3).then(news => {
        console.log(news);
        this.newsList = news.data.newsList;
      });
    });
  },
  methods: {
    viewDeatil(row) {
      this.$router.push({
        name: "newsDetail",
        query: {
          Id: row.Id
        }
      });
    }
  }
};
</script>

<style lang="less">
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
</style>
