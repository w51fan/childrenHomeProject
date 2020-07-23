<template>
  <div class="socialWorkstationPage">
    <div class="childrenHomePageHead">
      <div class="flex space-between">
        <div class="head flex">
          <div>
            <div v-if="User.ProfilePhoto!==''">
              <img
                :src="User.ProfilePhoto"
                alt
                style="width: 50px;height: 50px;border-radius: 50%;"
              />
            </div>
            <div v-else>
              <img src="../assets/nohead.png" alt />
            </div>
          </div>
          <div>
            <!-- <div class="name">{{User.Name}}</div> -->
            <div class="name">{{User.Name}}</div>
            <div class="status will" style="width: 120px;margin: 0 16px;">社区工作服务管理员</div>
          </div>
        </div>

        <div @click="goSetting">
          <van-cell value="账号设置" is-link style="margin-top: 10px;" />
        </div>
      </div>
    </div>
    <div class="gap gapfive"></div>
    <div class="myChildrenHome">
      <div>我的社区工作服务站</div>
    </div>
    <div class="gap gapfive"></div>
    <div class="socialStationList">
      <div>
        <div
          v-for="(socialStation,index) in socialStationList"
          :key="index"
          class="childrenHomeItem"
          @click="goSocialStationDetail(socialStation)"
        >
          <div class="flex childrenHomeItemName">
            <img src="../assets/smile.png" alt />
            <div class="name">{{socialStation.Name}}</div>
          </div>
          <div class="gap gapone"></div>
          <div class="flex space-between" style="padding:20px 20px 10px;">
            <div class="childrenMastertableHead">人数</div>
            <div class="childrenMastertableHead">活动次数</div>
            <div class="childrenMastertableHead">评分</div>
          </div>
          <van-cell class="childrenMaster">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="flex space-between">
                <div class="custom-title">{{socialStation.SubsistenceCount}}人</div>
                <div>{{socialStation.ActivityCount}}次</div>
                <div>
                  <ul class="cleanfloat flex">
                    <li
                      v-for="(n,index) in 5"
                      :key="index"
                      :class="[index+1>socialStation.Score/10?'grayStar':'star']"
                    >★</li>
                  </ul>
                </div>
              </div>
            </template>
          </van-cell>
          <div class="gap gaptwo"></div>
        </div>
      </div>
    </div>
    <assistantBottomNav ref="assistantBottomNav" :selectedNav.sync="selectedNav"></assistantBottomNav>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getUserInfo, getSocialStationList } from "@/api/home";
import assistantBottomNav from "./assistantBottomNav";
export default {
  name: "socialWorkstation",
  components: {
    assistantBottomNav
  },
  data() {
    return {
      socialStationList: [],
      selectedNav: "socialWorkstation",
      showOverlay: false
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    User() {
      return this.$store.state.common.User;
    }
  },
  mounted() {
    this.showOverlay = true;
    if (this.$route.query.User && this.$route.query.UserTpye) {
      this.$store.commit("common/getUserTpye", this.$route.query.UserTpye);
      this.$store.commit("common/SET_UserTpye", this.$route.query.UserTpye);
      this.$store.commit("common/getUser", this.$route.query.User);
    }
    if (!this.Token) {
      this.$store.commit(
        "common/getToken",
        window.localStorage.getItem("Token")
      );
    }
    getUserInfo(this.Token)
      .then(res => {
        console.log("getUserInfo", res);
        //type 4:儿童主任,显示儿童之家，type 社会救助服务管理员 显示社工服务   1. 市级管理员 2. 县级管理员  3. 镇级管理员 4. 村级管理员 5. 村级讲师 6. 助理 7. 志愿者 11. 家长用户
        // this.$store.commit("common/getUserTpye", res.data.User.Type);
        getSocialStationList(this.Token)
          .then(result => {
            console.log("getSocialStationList", result);
            this.$refs.assistantBottomNav.init();
            this.socialStationList = result.data.socialStationList;
            if (this.socialStationList.length > 0) {
              this.$store.commit(
                "common/getCityId",
                this.socialStationList[0].CityId
              );
              this.$store.commit(
                "common/SET_cityId",
                this.socialStationList[0].CityId
              );
              // this.$store.commit("common/getTownId", this.socialStationList[0].TownId);
              // this.$store.commit("common/getVillageId", this.socialStationList[0].VillageId);
              this.showOverlay = false;
            } else {
              this.$store.commit("common/getCityId", 2018);
              this.$store.commit("common/getCityId", 2018);
              this.$store.commit("common/SET_cityId", 2018);
              this.showOverlay = false;
            }
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
  methods: {
    goSocialStationDetail(socialStation) {
      this.$store.commit("common/getVillageId", socialStation.Id);
      this.$router.push({
        name: "socialWorkstationDetail",
        query: {
          currentPath: "socialWorkstation"
        }
      });
    },
    goSetting() {
      this.$router.push({
        name: "accountSetting",
        query: {
          currentPath: "socialWorkstation"
        }
      });
    }
  }
};
</script>

<style lang="less">
.socialWorkstationPage {
  margin-bottom: 60px;
  .childrenHomePageHead {
    padding: 20px;
    .head {
      img {
        width: 50px;
      }
      .name {
        text-align: left;
        padding: 0 20px 10px;
      }
    }
  }
  .myChildrenHome {
    text-align: left;
    padding: 20px;
    font-size: 18px;
  }
  .socialStationList {
    .childrenHomeItem {
      .childrenHomeItemName {
        padding: 20px;
        line-height: 30px;
        img {
          width: 30px;
          height: 30px;
          margin-top: -2px;
        }
        .name {
          padding-left: 10px;
        }
      }
      .childrenMaster {
        .van-cell__title {
          padding: 0 5px;
        }
      }
    }
  }

  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .star {
    color: #fbb32f;
  }
  .grayStar {
    color: #e0e0e0;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .gaptwo {
    height: 3px;
  }
  .gapfive {
    height: 15px;
  }
  .status {
    margin: 0 15px;
    border-radius: 14px;
    font-size: 12px;
    padding: 2px 0;
    line-height: 20px;
  }
  .will {
    background: #ffac0ed6;
    color: #6f6f6f;
  }
  .childrenUserHead {
    width: 30px;
    text-align: center;
    font-size: 12px;
    padding: 8px;
    background: #3b4c5a;
    border-radius: 50%;
  }
}
</style>