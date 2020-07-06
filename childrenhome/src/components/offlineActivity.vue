<template>
  <div class="offlineActivityPage">
    <div style="padding:20px 40px">
      <van-button type="warning" color="#ffac22" class="addBtn" @click="go">新建活动</van-button>
    </div>
    <div class="gap gapfive"></div>
    <div class="content">
      <van-tabs v-model="activeTab" class="offlineActivityTabs">
        <van-tab title="未完成活动">
          <div class="unfinishedItem">
            <div class="title flex space-between">
              <div class="flex">
                <van-icon name="checked" color="#10559e" style="font-size: 20px;" />
                <div style="padding-left:5px;">2020年8月9日</div>
              </div>
              <div class="status ing">进行中...</div>
            </div>
            <div class="content">全家雪村演示儿童之家</div>
          </div>
          <div class="gap gapone"></div>
        </van-tab>
        <van-tab title="已完成活动">
          <div class="finishedItem">
            <div class="title flex space-between">
              <div class="flex">
                <van-icon name="checked" color="gray" style="font-size: 20px;" />
                <div style="padding-left:5px;">2020年8月9日</div>
              </div>
              <div class="status finished">已结束</div>
            </div>
            <div class="content">全家雪村演示儿童之家</div>
            <!-- <div class="flex" @click="viewDetail(item)">
              <img
                :src="activityImg.Url"
                v-for="(activityImg,turn) in item.ActivityImage.slice(3)"
                :key="turn"
                style="width: 50px;height: 100px;padding: 15px 20px;"
              />
              <div>...</div>
            </div>-->
          </div>
          <div class="gap gapone"></div>
        </van-tab>
      </van-tabs>
    </div>
    <assistantBottomNav :selectedNav.sync="selectedNav"></assistantBottomNav>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import assistantBottomNav from "./assistantBottomNav";
import { getActivityList } from "@/api/home";
export default {
  name: "offlineActivity",
  components: {
    assistantBottomNav
  },
  data() {
    return {
      activeTab: 0,
      selectedNav: "offlineActivity",
      showOverlay: false
    };
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  mounted() {
    //{cityId, areaId, townId, type, activityType}
    this.showOverlay = true;
    getActivityList({
      cityId: this.cityId
    })
      .then(res => {
        console.log("getActivityList", res);
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });
  },
  methods: {
    edit() {},
    go(){
      this.$router.push({
        name: 'addActivity',
        query: {
          currentPath: 'offlineActivity'
        }
      });
    }
  }
};
</script>

<style lang="less">
.offlineActivityPage {
  margin-bottom: 60px;
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .addBtn {
    width: 100%;
    color: #3a3a3a !important;
  }
  .content {
    // padding: 20px;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .gapfive {
    height: 20px;
  }
  .offlineActivityTabs {
    /deep/.van-tabs__line {
      width: 50% !important;
    }
    .unfinishedItem {
      padding: 20px;
      .title {
        i {
          font-size: 20px;
        }
        .status {
          font-size: 14px;
          padding: 2px 5px;
          border-radius: 15px;
        }
        .ing {
          background: #10559e;
          color: #fff;
        }
      }
      .content {
        text-align: left;
        padding: 15px 15px 0;
      }
    }
    .finishedItem {
      padding: 20px;
      .title {
        i {
          font-size: 20px;
        }
        .status {
          font-size: 14px;
          padding: 2px 5px;
          border-radius: 15px;
        }
        .finished {
          background: #e8e8e8;
          color: #7d7d7d;
        }
      }
      .content {
        text-align: left;
        padding: 15px 15px 0;
      }
    }
  }
}
</style>