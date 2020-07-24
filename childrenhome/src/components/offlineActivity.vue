<template>
  <div class="offlineActivityPage">
    <div style="padding:20px 40px" v-if="showAddBtn">
      <!-- <div style="padding:20px 40px" > -->
      <van-button type="warning" color="#ffac22" class="addBtn" @click="go">新建活动</van-button>
    </div>
    <div class="gap gapfive" v-if="showAddBtn"></div>
    <div class="content">
      <van-tabs v-model="activeTab" class="offlineActivityTabs">
        <van-tab title="未完成活动">
          <div v-if="!showNodata">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div v-for="(activity,index) in activityList" :key="index">
                <div class="unfinishedItem" @click="goUnfinishedActivity(activity)">
                  <div class="title flex space-between">
                    <div class="flex">
                      <van-icon name="checked" color="#10559e" style="font-size: 20px;" />
                      <div style="padding-left:5px;">{{getDate(activity.Date)}}</div>
                    </div>
                    <div class="status ing">进行中</div>
                  </div>
                  <div class="content">
                    <div>{{activity.ChildrenHome.Name!==''?activity.ChildrenHome.Name:activity.SocialStation.Name}} 即将举办 {{activityTypeIDArray[activity.Type]}}</div>
                  </div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </van-list>
          </div>
          <div v-else style="padding: 20px;">暂无未完成活动</div>
        </van-tab>
        <van-tab title="已完成活动">
          <div class="finishedItem">
            <div v-if="!showNodata">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div v-for="(activity,index) in activityList" :key="index">
                  <div class="unfinishedItem" @click="goActivityDetail(activity)">
                    <div class="title flex space-between">
                      <div class="flex">
                        <van-icon name="checked" color="#10559e" style="font-size: 20px;" />
                        <div style="padding-left:5px;">{{getDate(activity.Date)}}</div>
                      </div>
                      <div class="status finished">已结束</div>
                    </div>
                    <div class="content">
                      <div>{{activity.ChildrenHome.Name!==''?activity.ChildrenHome.Name:activity.SocialStation.Name}} 举办了 {{activityTypeIDArray[activity.Type]}}</div>
                      <div class="flex">
                        <img
                          :src="activityImg.Url"
                          v-for="(activityImg,turn) in activity.ActivityImage.slice(0,3)"
                          :key="turn"
                          style="width: 80px;height: 100px;padding: 15px 15px 15px 0;"
                        />
                        <div v-if="activity.ActivityImage.length>0">...</div>
                      </div>
                    </div>
                  </div>
                  <div class="gap gapone"></div>
                </div>
              </van-list>
            </div>
            <div v-else style="padding: 20px;">暂无已完成活动</div>
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
      activityImg: [],
      showNodata: true,
      activityTypeIDArray: {
        1: "家庭教育",
        2: "儿童团辅",
        3: "家庭亲子",
        4: "安全护卫",
        5: "微课"
      },
      loading: false,
      finished: false,
      // refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: ""
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
      if (this.UserTpye === 4 || this.UserTpye === 11) {
        this.getActivityListByUserId({
          type: type,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          isPull: false
        });
      } else {
        this.getSocialStationActivityListByUserId({
          type: type,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          isPull: false
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
    getActivityListByUserId(param) {
      const { type, pageNumber, pageSize, isPull } = param;
      console.log("isPull ", isPull);
      getActivityListByUserId(this.Token, type, pageNumber, pageSize)
        .then(res => {
          console.log("getActivityListByUserId", res);
          if (isPull) {
            res.data.activityList.forEach(item => {
              this.activityList.push(item);
            });
            this.loading = false;
            this.showOverlay = false;
            if (!(this.activityList.length < this.total)) this.finished = true;
          } else {
            this.total = res.data.total;
            if (res.data.code) this.showOverlay = false;
            if (res.data.activityList) {
              this.activityList = res.data.activityList;
              this.showNodata = false;
            }
          }

          this.showOverlay = false;
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
    getSocialStationActivityListByUserId(param) {
      const { type, pageNumber, pageSize, isPull } = param;
      console.log("isPull ", isPull);
      getSocialStationActivityListByUserId(
        this.Token,
        type,
        pageNumber,
        pageSize
      )
        .then(res => {
          console.log("getSocialStationActivityListByUserId", res);

          if (isPull) {
            res.data.activityList.forEach(item => {
              this.activityList.push(item);
            });
            this.loading = false;
            this.showOverlay = false;
            if (!(this.activityList.length < this.total)) this.finished = true;
          } else {
            this.total = res.data.total;
            if (res.data.code) this.showOverlay = false;
            if (res.data.activityList) {
              this.activityList = res.data.activityList;
              this.showNodata = false;
            }
            this.showOverlay = false;
          }
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
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
    },
    onLoad() {
      // if (this.refreshing) {
      //   this.activityList = [];
      //   this.refreshing = false;
      // }
      if (this.activityList.length < this.total) {
        if (this.activeTab === 1) {
          if (this.UserTpye === 4 || this.UserTpye === 11) {
            this.getActivityListByUserId({
              type: 3,
              pageNumber: this.pageNumber++ + 1,
              pageSize: this.pageSize,
              isPull: true
            });
          } else {
            this.getSocialStationActivityListByUserId({
              type: 3,
              pageNumber: this.pageNumber++ + 1,
              pageSize: this.pageSize,
              isPull: true
            });
          }
        } else {
          if (this.UserTpye === 4 || this.UserTpye === 11) {
            this.getActivityListByUserId({
              type: 1,
              pageNumber: this.pageNumber++ + 1,
              pageSize: this.pageSize,
              isPull: true
            });
          } else {
            this.getSocialStationActivityListByUserId({
              type: 1,
              pageNumber: this.pageNumber++ + 1,
              pageSize: this.pageSize,
              isPull: true
            });
          }
        }
        // this.getActivityList({
        //   cityId: this.cityId,
        //   isInit: false,
        //   pageNumber: this.pageNumber++ + 1,
        //   pageSize: this.pageSize,
        //   isPull: true
        // });
      } else {
        this.finished = true;
      }
      this.loading = false;
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