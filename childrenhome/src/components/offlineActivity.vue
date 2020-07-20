<template>
  <div class="offlineActivityPage">
    <div style="padding:20px 40px" v-if="showAddBtn">
      <van-button type="warning" color="#ffac22" class="addBtn" @click="go">新建活动</van-button>
    </div>
    <div class="gap gapfive" v-if="showAddBtn"></div>
    <div class="content">
      <van-tabs v-model="activeTab" class="offlineActivityTabs">
        <van-tab title="未完成活动">
          <div v-if="activityList.length>0">
            <div v-for="(activity,index) in activityList" :key="index">
              <div class="unfinishedItem" @click="goUnfinishedActivity(activity)">
                <div class="title flex space-between">
                  <div class="flex">
                    <van-icon name="checked" color="#10559e" style="font-size: 20px;" />
                    <div style="padding-left:5px;">{{getDate(activity.Date)}}</div>
                  </div>
                  <div class="status ing">进行中</div>
                </div>
                <div
                  class="content"
                >{{activity.ChildrenHome.Name!==''?activity.ChildrenHome.Name:activity.SocialStation.Name}} 即将举办 {{activityTypeIDArray[activity.Type]}}</div>
              </div>
              <div class="gap gapone"></div>
            </div>
          </div>
          <div v-else style="padding: 20px;">暂未完成活动</div>
        </van-tab>
        <van-tab title="已完成活动">
          <div class="finishedItem">
            <div v-if="activityList.length>0">
              <div v-for="(activity,index) in activityList" :key="index">
                <div class="unfinishedItem" @click="goActivityDetail(activity)">
                  <div class="title flex space-between">
                    <div class="flex">
                      <van-icon name="checked" color="#10559e" style="font-size: 20px;" />
                      <div style="padding-left:5px;">{{getDate(activity.Date)}}</div>
                    </div>
                    <div class="status finished">已结束</div>
                  </div>
                  <div
                    class="content"
                  >{{activity.ChildrenHome.Name!==''?activity.ChildrenHome.Name:activity.SocialStation.Name}} 举办了 {{activityTypeIDArray[activity.Type]}}</div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </div>
            <div v-else style="padding: 20px;">暂已完成活动</div>
          </div>
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
import {
  getActivityList,
  getActivityListByUserId,
  getSocialStationActivityListByUserId
} from "@/api/home";
export default {
  name: "offlineActivity",
  components: {
    assistantBottomNav
  },
  data() {
    return {
      showAddBtn: true,
      activeTab: 0,
      selectedNav: "offlineActivity",
      showOverlay: false,
      activityList: [],
      activityTypeIDArray: {
        1: "家庭教育",
        2: "儿童团辅",
        3: "家庭亲子",
        4: "安全护卫",
        5: "微课"
      }
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    UserTpye() {
      return this.$store.state.common.UserTpye;
    }
  },
  watch: {
    activeTab(val) {
      console.log(val);
      if (val === 1) {
        this.init(3);
      } else {
        this.init(1);
      }
    }
  },
  mounted() {
    //1未完成活动，3已完成活动
    //{cityId, areaId, townId, type, activityType}
    if (this.UserTpye === 11) this.showAddBtn = false;
    this.showOverlay = true;
    this.init(1);
  },
  methods: {
    init(type) {
      if (this.UserTpye === 4) {
        getActivityListByUserId(this.Token, type)
          .then(res => {
            console.log("getActivityListByUserId", res);
            this.activityList = res.data.activityList;
            this.showOverlay = false;
          })
          .catch(err => {
            console.log("err", err);
            this.showOverlay = false;
          });
      } else {
        getSocialStationActivityListByUserId(this.Token, type)
          .then(res => {
            console.log("getActivityListByUserId", res);
            this.activityList = res.data.activityList;
            this.showOverlay = false;
          })
          .catch(err => {
            console.log("err", err);
            this.showOverlay = false;
          });
      }
    },
    edit() {},
    go() {
      this.$router.push({
        name: "addActivity",
        query: {
          currentPath: "offlineActivity",
          activityType: 1
        }
      });
    },
    goUnfinishedActivity(activity) {
      this.$router.push({
        name: "unfinishedActivity",
        query: {
          currentPath: "offlineActivity",
          activityId: activity.Id
        }
      });
    },
    goActivityDetail(activity) {
      this.$router.push({
        name: "activityDetail",
        query: {
          currentPath: "offlineActivity",
          activityId: activity.Id,
          showSubmitButton: true
        }
      });
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}-${month}-${day}`;
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
      // padding: 20px;
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