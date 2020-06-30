<template>
  <div style="margin-bottom: 60px;">
    <van-tabs v-model="selected">
      <van-tab title="最新活动">
        <div class="gap"></div>
        <div class="latestActivity">
          <div style="background-color: #fff;line-height: 48px;">请选择活动类型：</div>
          <van-dropdown-menu active-color="#ee0a24" style="width: 200px;">
            <van-dropdown-item v-model="selectedActivity" :options="activities" />
          </van-dropdown-menu>
        </div>
        <div class="gap gapfive"></div>
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
              v-for="(activityImg,turn) in item.ActivityImage.slice(3)"
              :key="turn"
              style="width: 50px;height: 100px;padding: 15px 20px;"
            />
            <div>...</div>
          </div>
          <!-- <van-icon name="checked" />
          <div>{{item.Date}}</div>-->
        </div>
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
        <div v-if="showTips===1">
          <div>选择一个地区进行查询</div>
          <div>请点击上方"选择地区"进行查询</div>
        </div>
        <div v-else-if="showTips===2">没有数据</div>
        <div v-else>
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
                v-for="(activityImg,turn) in item.ActivityImage.slice(3)"
                :key="turn"
                style="width: 50px;height: 100px;padding: 15px 20px;"
              />
              <div>...</div>
            </div>
            <!-- <van-icon name="checked" />
            <div>{{item.Date}}</div>-->
          </div>
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
              <div @click="collapseVillage(village)">{{town.text}}</div>
            </template></van-collapse-item>
              </van-collapse>
            </template>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>

    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import { getActivityList, getVillageList, getTownList } from "@/api/home";
import bottomNav from "./bottomNav";
export default {
  name: "socialParticipation",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
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
      villageItems: []
    };
  },
  mounted() {
    // 邵阳市cityId:2018 双清区areaId:2021 板桥乡townId:3713 activityType 不传就是全部
    // console.log('this.$route.query.cityId',this.cityId)
    this.getActivityList(this.cityId, 2021, 3713, true);
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  watch: {
    selected(val) {
      console.log("val", val);
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
        });
      } else if (val === 0) {
        this.getActivityList(this.cityId, 2021, 3713, true);
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
        });
      }
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    viewDetail(row) {
      this.$router.push({
        name: "activityDetail",
        query: {
          Id: row.Id
        }
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
        this.selectedVillage = this.villageList[0].value;
      });
    },
    changeVillage(event) {
      this.getActivityList(
        this.cityId,
        this.selectedTown,
        this.selectedVillage
      );
    },
    getActivityList(cityId, areaId, townId, isInit) {
      getActivityList({
        cityId: cityId,
        areaId: areaId,
        townId: townId
        // activityType: ""
      }).then(res => {
        console.log("res", res);

        this.activityList = res.data.activityList;

        if (!isInit && this.activityList.length == 0) {
          this.showTips = 2;
        } else if (!isInit && this.activityList.length > 0) {
          this.showTips = 3;
        }
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
      getVillageList(town.TownId).then(village => {
        console.log("getVillageList", village);
        let townTemp = [];
        village.data.villageList.forEach(ele => {
          townTemp.push({
            text: ele.Name,
            TownId: ele.VillageId
          });
        });
        this.villageItems = townTemp;
      });
    },
    collapseVillage(village){
      console.log("collapseVillage", village);
      this.$router.push({
        name: "childrenHomeDetail",
        query: {
          VillageId: village.VillageId
        }
      });
    }
  }
};
</script>

<style lang="less"  scoped>
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
</style>

