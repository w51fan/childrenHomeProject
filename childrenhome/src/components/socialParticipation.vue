<template>
  <div class="socialParticipationPage">
    <van-tabs v-model="selected">
      <van-tab title="最新活动">
        <div class="gap"></div>
        <div class="latestActivity">
          <div style="background-color: #fff;line-height: 48px;">请选择活动类型：</div>
          <van-dropdown-menu active-color="#ee0a24" style="width: 200px;">
            <van-dropdown-item
              v-model="selectedActivity"
              :options="activities"
              @change="changeActivityType"
            />
          </van-dropdown-menu>
        </div>
        <div class="gap gapfive"></div>
        <div v-if="activityList.length>0">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div v-for="(item,index) in activityList" :key="index">
                <div class="flex space-between">
                  <div style="padding:20px;">
                    <van-icon name="underway" v-if="item.Status===1" />
                    <van-icon name="checked" v-else :class="item.Status===3?'gry':''" />
                    {{getDate(item.Date)}}
                  </div>
                  <div class="status will" v-if="item.Status===1">即将开始</div>
                  <div class="status ing" v-else-if="item.Status===2">进行中...</div>
                  <div class="status finished" v-else>已结束</div>
                </div>
                <div class="abbreviation">{{item.Name}}...</div>
                <div class="flex" @click="viewDetail(item)">
                  <img
                    :src="activityImg.Url"
                    v-for="(activityImg,turn) in item.ActivityImage.slice(0,3)"
                    :key="turn"
                    style="width: 50px;height: 100px;padding: 15px 20px;"
                  />
                  <div>...</div>
                </div>
                <!-- <van-icon name="checked" />
                <div>{{item.Date}}</div>-->
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else style="color: #b9b9b9;padding-top: 30px;line-height: 30px;">没有最新活动数据</div>
      </van-tab>
      <van-tab title="全部活动">
        <div class="gap"></div>
        <div style="display: flex;justify-content: center;">
          <div style="background-color: #fff;line-height: 48px;">
            <van-icon name="location" />
            <span>请选择地区：</span>
          </div>
          <van-dropdown-menu active-color="#ee0a24" style="width: 100px;">
            <van-dropdown-item v-model="selectedTown" :options="townList" @change="changeTown" />
          </van-dropdown-menu>
          <van-dropdown-menu active-color="#ee0a24" style="width: 100px;">
            <van-dropdown-item
              v-model="selectedVillage"
              :options="villageList"
              :disabled="disabledTab"
              @change="changeVillage"
            />
          </van-dropdown-menu>
        </div>
        <div class="gap gapfive"></div>
        <div v-if="showTips===1" style="color: #b9b9b9;padding-top: 30px;line-height: 30px;">
          <div>选择一个地区进行查询</div>
          <div>请点击上方"选择地区"进行查询</div>
        </div>
        <div v-else-if="showTips===2">没有数据</div>
        <div v-else>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div v-for="(item,index) in activityList" :key="index">
                <div class="flex space-between">
                  <div style="padding:20px;">
                    <van-icon name="underway" v-if="item.Status===1" />
                    <van-icon name="checked" v-else :class="item.Status===3?'gry':''" />
                    {{item.Date}}
                  </div>
                  <div class="status will" v-if="item.Status===1">即将开始</div>
                  <div class="status ing" v-else-if="item.Status===2">进行中...</div>
                  <div class="status finished" v-else>已结束</div>
                </div>
                <div class="abbreviation">{{item.Name}}...</div>
                <div class="flex" @click="viewDetail(item)">
                  <img
                    :src="activityImg.Url"
                    v-for="(activityImg,turn) in item.ActivityImage.slice(0,3)"
                    :key="turn"
                    style="width: 50px;height: 100px;padding: 15px 20px;"
                  />
                  <div>...</div>
                </div>
                <!-- <van-icon name="checked" />
                <div>{{item.Date}}</div>-->
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="儿童之家">
        <div class="gap"></div>
        <van-collapse v-model="selectedTown" accordion>
          <van-collapse-item
            :title="town.text"
            :name="index+1"
            v-for="(town,index) in townItems"
            :key="index"
            style="text-align: left;"
            @click="collapseTown"
          >
            <template #title>
              <div @click="collapseTown(town)">{{town.text}}</div>
            </template>
            <template #default v-if="villageItems.length>0">
              <van-collapse v-model="selectedVillage" accordion>
                <van-collapse-item
                  :title="village.text"
                  :name="trun+1"
                  v-for="(village,trun) in villageItems"
                  :key="trun"
                  style="text-align: left;"
                  class="two"
                >
                  <template #title>
                    <div @click="collapseVillage(village)">{{village.text}}</div>
                  </template>
                </van-collapse-item>
              </van-collapse>
            </template>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="学校儿童之家">
        <div class="gap"></div>
        <van-collapse v-model="selectedTown" accordion>
          <!-- <van-collapse-item
            :title="town.text"
            :name="index+1"
            v-for="(town,index) in townItems"
            :key="index"
            style="text-align: left;"
            @click="collapseVillage(town)"
          >
          </van-collapse-item>-->
          <van-cell
            :value="item.Name"
            v-for="(item,index) in schoolChildrenHomeList"
            :key="index"
            style="text-align: left;"
            @click="viewChildhomeDetail(item)"
          />
        </van-collapse>
      </van-tab>
    </van-tabs>

    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  getActivityList,
  getVillageList,
  getTownList,
  getSchoolChildrenHomeList
} from "@/api/home";
import bottomNav from "./bottomNav";
export default {
  name: "socialParticipation",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: 0,
      selectedActivity: 0,
      selectedNav: "socialParticipation",
      activities: [
        { text: "请选择", value: 0 },
        { text: "线下活动", value: 1 },
        { text: "线上活动", value: 2 }
      ],
      activityList: [],
      selectedTown: "",
      townList: [],
      selectedVillage: "",
      selectedVillage: "",
      villageList: [],
      disabledTab: true,
      showTips: 1,
      selectedTown: "",
      townItems: [],
      villageItems: [],
      showOverlay: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: "",
      schoolChildrenHomeList: ""
    };
  },
  mounted() {
    // 邵阳市cityId:2018 双清区areaId:2021 板桥乡townId:3713 activityType 不传就是全部
    // console.log('this.$route.query.cityId',this.cityId)
    if (this.$route.query.selected) this.selected = this.$route.query.selected;
    this.showOverlay = true;
    this.getActivityList({
      cityId: this.cityId,
      isInit: false,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      isPull: false
    });
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  watch: {
    selected(val) {
      console.log("val", val);
      this.showOverlay = true;
      if (val === 1) {
        this.showTips = 1;
        this.activityList = [];
        getTownList(this.cityId).then(res => {
          console.log("townlist", res);
          let temp = [{ text: "请选择", value: 0 }];
          res.data.townList.forEach(element => {
            temp.push({
              text: element.Name,
              TownId: element.TownId,
              value: element.TownId
            });
          });
          this.townList = temp;
          this.selectedTown = this.townList[0].value;
          this.selectedVillage = "";
          this.showOverlay = false;
        });
      } else if (val === 0) {
        this.getActivityList({
          cityId: this.cityId,
          isInit: true,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          isPull: false
        });
      } else if (val === 3) {
        getSchoolChildrenHomeList(this.cityId).then(res => {
          console.log("getSchoolChildrenHomeList", res);
          this.schoolChildrenHomeList = res.data.schoolChildrenHomeList;
          // let townTemp = [];
          // res.data.schoolChildrenHomeList.forEach(ele => {
          //   townTemp.push({
          //     text: ele.Name,
          //     TownId: ele.TownId
          //   });
          // });
          // this.townItems = townTemp;
          this.showOverlay = false;
        });
      } else {
        getTownList(this.cityId).then(town => {
          console.log("townlist2", town);
          let townTemp = [];
          town.data.townList.forEach(ele => {
            townTemp.push({
              text: ele.Name,
              TownId: ele.TownId
            });
          });
          this.townItems = townTemp;
          this.showOverlay = false;
        });
      }
    }
  },
  methods: {
    viewChildhomeDetail(row) {
      console.log("collapseVillage", row);
      this.$store.commit("common/getVillageId", row.VillageId);
      this.$router.push({
        name: "childrenHomeDetail",
        query: {
          currentPath: "socialParticipation",
          select: 3
        }
      });
    },
    viewDetail(row) {
      console.log(row);
      this.$router.push({
        name: "activityDetail",
        query: {
          activityId: row.Id,
          currentPath: "socialParticipation"
        }
      });
    },
    changeActivityType(event) {
      console.log("event", event);
      this.selectedActivity = event;
      this.getActivityList({
        cityId: this.cityId,
        isInit: false,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isPull: false
      });
    },
    changeTown(event) {
      // console.log('event',event)
      getVillageList(event).then(res => {
        this.disabledTab = false;
        console.log("villageList", res);
        let temp = [{ text: "请选择", value: 0 }];
        res.data.villageList.forEach(element => {
          temp.push({
            text: element.Name,
            TownId: element.VillageId,
            value: element.VillageId
          });
        });
        this.villageList = temp;
        this.selectedVillage = this.villageList[1].value;
        this.changeVillage();
      });
    },
    changeVillage(event) {
      this.getActivityList({
        cityId: this.cityId,
        areaId: this.selectedTown,
        townId: this.selectedVillage,
        activityType: this.selectedActivity > 0 ? this.selectedActivity : "",
        pageNumber: 1,
        pageSize: 10
      });
    },
    //cityId,
    // areaId,
    // townId,
    // isInit,
    // pageNumber,
    // pageSize,
    // isPull
    getActivityList(param) {
      getActivityList({
        cityId: param.cityId,
        areaId: param.areaId,
        townId: param.townId,
        activityType: this.selectedActivity > 0 ? this.selectedActivity : "",
        pageNumber: param.pageNumber,
        pageSize: param.pageSize
      })
        .then(res => {
          console.log("res", res);
          if (param.isPull) {
            res.data.activityList.forEach(item => {
              this.activityList.push(item);
            });
            this.loading = false;
            this.showOverlay = false;
            if (!(this.activityList.length < this.total)) this.finished = true;
          } else {
            this.activityList = res.data.activityList;
            this.total = res.data.total;
            if (!param.isInit && this.activityList.length == 0) {
              this.showTips = 2;
            } else if (!param.isInit && this.activityList.length > 0) {
              this.showTips = 3;
            }
            this.showOverlay = false;
          }

          // {
          //   // 加载状态结束
          //   this.loading = false;
          //   // 数据全部加载完成
          //   this.finished = true;
          // }
        })
        .catch(err => {
          console.log("getTotalCount", err);
          this.showOverlay = false;
        });
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    collapseTown(town) {
      this.showOverlay = true;
      getVillageList(town.TownId).then(village => {
        // console.log("getVillageList", village);
        let townTemp = [];
        village.data.villageList.forEach(ele => {
          townTemp.push({
            text: ele.Name,
            VillageId: ele.VillageId
          });
        });
        // console.log("townTemp", townTemp);
        this.villageItems = townTemp;
        this.showOverlay = false;
      });
    },
    collapseVillage(village) {
      // console.log("collapseVillage", village);
      this.$store.commit("common/getVillageId", village.VillageId);
      this.$router.push({
        name: "childrenHomeDetail",
        query: {
          currentPath: "socialParticipation",
          select: 2
        }
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.activityList = [];
        this.refreshing = false;
      }
      if (this.activityList.length < this.total) {
        this.getActivityList({
          cityId: this.cityId,
          isInit: false,
          pageNumber: this.pageNumber++ + 1,
          pageSize: this.pageSize,
          isPull: true
        });
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
    onRefresh() {
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

<style lang="less"  scoped>
.socialParticipationPage {
  margin-bottom: 60px;
  .latestActivity {
    display: flex;
    justify-content: center;
  }
  /deep/.van-dropdown-menu__bar {
    box-shadow: none;
  }
  /deep/.van-icon-underway {
    color: #ff8917;
  }
  /deep/.van-icon-checked {
    color: #1989fa;
  }
  .gry {
    color: #8e8a8a;
  }
  .status {
    margin: 15px;
    padding: 0 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 30px;
  }
  .will {
    background: #ffac0ed6;
    color: #6f6f6f;
  }
  .ing {
    background: #10559e;
    color: #fff;
  }
  .finished {
    background: #e8e8e8;
    color: #7d7d7d;
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
  .gapfive {
    height: 2px;
  }
  .abbreviation {
    text-align: left;
    padding: 0 20px;
  }
  .two {
    /deep/.van-cell__right-icon {
      display: none;
    }
  }
}
</style>

