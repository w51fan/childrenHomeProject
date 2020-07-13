<template>
  <div class="careIndexPage">
    <div class="careIndexTitle">数据统计</div>
    <div class="gap gapone"></div>
    <div class="flex">
      <div class="item">
        <div>
          <span class="green">{{totalCount.ChildrenCount}}</span>
          <span class="gray">名</span>
        </div>
        <div>关爱儿童</div>
      </div>
      <div class="item">
        <div>
          <span class="green">{{totalCount.ActivityCount}}</span>
          <span class="gray">场</span>
        </div>
        <div>关爱活动</div>
      </div>
      <div class="item">
        <div>
          <span class="green">{{totalCount.CourseCount}}</span>
          <span class="gray">小时</span>
        </div>
        <div>家庭教育视频</div>
      </div>
    </div>
    <div class="gap gapone"></div>
    <div class="flex">
      <div class="item">
        <div>
          <span class="green">{{totalCount.ChildrenHomeCount}}</span>
          <span class="gray">个</span>
        </div>
        <div>儿童之家</div>
      </div>
      <div class="item">
        <div>
          <span class="green">{{totalCount.UserCount}}</span>
          <span class="gray">个</span>
        </div>
        <div>儿童主任</div>
      </div>
    </div>
    <div class="gap gapten"></div>
    <van-tabs class="careIndexTabs" v-model="activeTab">
      <van-tab title="活动统计">
        <div class="gap gaptwo"></div>
        <div v-for="(area,index) in areaItems" :key="index">
          <div class="flex space-between" style="padding: 20px;">
            <div>{{area.text}}</div>
            <div v-if="area.ActivityCount>0" @click="collapseDown(area,index)">
              ({{area.ActivityCount}}场)
              <van-icon name="arrow-down" v-if="showCurrentDown===index" />
              <van-icon name="arrow" v-else />
            </div>
            <div v-else>
              (0场)
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="gap gapone"></div>
          <div v-if="showChild===index">
            <div v-for="(child,turn) in area.children" :key="turn">
              <div class="flex space-between" style="padding: 5px 25px;">
                <div style="border-left: 1px solid #676767;padding-left: 5px;">--{{child.text}}</div>
                <div v-if="child.ActivityCount>0" @click="collapseSecondDown(child,turn)">
                  ({{child.ActivityCount}}场)
                  <van-icon name="arrow-down" v-if="showSecondCurrentDown===turn" />
                  <van-icon name="arrow" v-else />
                </div>
                <div v-else>
                  (0场)
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="gap gapone"></div>
              <div v-if="showSecondChild===turn">
                <div v-for="(tree,temp) in child.children" :key="temp">
                  <div class="flex space-between" style="padding: 5px 45px;">
                    <div style="border-left: 1px solid #676767;padding-left: 5px;">--{{tree.text}}</div>
                    <div v-if="tree.ActivityCount>0">({{tree.ActivityCount}}场)</div>
                    <div v-else>(0场)</div>
                  </div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="儿童统计">
        <div class="gap gaptwo"></div>
        <div v-for="(area,index) in childrenItems" :key="index">
          <div class="flex space-between" style="padding: 20px;">
            <div>{{area.text}}</div>
            <div v-if="area.ChildrenCount>0" @click="collapseDown(area,index)">
              ({{area.ChildrenCount}}名)
              <van-icon name="arrow-down" v-if="showCurrentDown===index" />
              <van-icon name="arrow" v-else />
            </div>
            <div v-else>
              (0名)
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="gap gapone"></div>
          <div v-if="showChild===index">
            <div v-for="(child,turn) in area.children" :key="turn">
              <div class="flex space-between" style="padding: 5px 25px;">
                <div style="border-left: 1px solid #676767;padding-left: 5px;">--{{child.text}}</div>
                <div v-if="child.ChildrenCount>0" @click="collapseSecondDown(child,turn)">
                  ({{child.ChildrenCount}}名)
                  <van-icon name="arrow-down" v-if="showSecondCurrentDown===turn" />
                  <van-icon name="arrow" v-else />
                </div>
                <div v-else>
                  (0名)
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="gap gapone"></div>
              <div v-if="showSecondChild===turn">
                <div v-for="(tree,temp) in child.children" :key="temp">
                  <div class="flex space-between" style="padding: 5px 45px;">
                    <div style="border-left: 1px solid #676767;padding-left: 5px;">--{{tree.text}}</div>
                    <div v-if="tree.ChildrenCount>0">({{tree.ChildrenCount}}名)</div>
                    <div v-else>(0名)</div>
                  </div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="儿童主任">
        <div class="gap gaptwo"></div>
        <div class="flex space-between">
          <div class="childrenMastertableHead">儿童之家</div>
          <div class="childrenMastertableHead">儿童主任</div>
          <div class="childrenMastertableHead">活动数</div>
        </div>
        <div class="gap gapone"></div>
        <van-cell
          class="childrenMaster"
          :value="childrenHome.ActivityCount"
          is-link
          @click="goDetail(childrenHome)"
          v-for="(childrenHome,index) in topChildrenHomeList"
          :key="index"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="flex space-between">
              <div class="custom-title">{{childrenHome.Name}}</div>
              <div>{{childrenHome.ChildrenDirector}}</div>
            </div>
          </template>
        </van-cell>
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
import bottomNav from "./bottomNav";

import {
  getTotalCount,
  getTreeCount,
  getTopChildrenHomeList
} from "@/api/home";
export default {
  name: "careIndex",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "careIndex",
      totalCount: "",
      activeTab: 0,
      areaList: [],
      activeArea: 0,
      activeNames: "",
      activeNames2: "",
      activeNames3: "",
      areaItems: [],
      childrenItems: [],
      childerenHomeList: [],
      topChildrenHomeList: [],
      showOverlay: false,
      showCurrentDown: "",
      showSecondCurrentDown: "",
      showChild: "",
      showSecondChild: ""
    };
  },
  mounted() {
    this.showOverlay = true;
    if (this.$route.query.activeTab)
      this.activeTab = this.$route.query.activeTab;
    getTotalCount(this.cityId)
      .then(res => {
        console.log("getTotalCount", res);
        this.totalCount = res.data.totalCount;
        getTreeCount(this.cityId)
          .then(result => {
            console.log("getTreeCount", result);
            this.areaList = result.data.areaList;
            this.areaList.forEach(item => {
              let areaTemp = {
                text: item.ActivityCount > 0 ? `${item.Name}` : item.Name,
                children: [],
                ActivityCount: item.ActivityCount
              };
              let childrenTemp = {
                text: item.ChildrenCount > 0 ? `${item.Name}   ` : item.Name,
                children: [],
                ChildrenCount: item.ChildrenCount
              };
              if (item.Area.length > 0) {
                item.Area.forEach(areaItem => {
                  let activityChildren = [];
                  let childrenChildren = [];
                  if (areaItem.Area.length > 0) {
                    areaItem.Area.forEach(threeItem => {
                      activityChildren.push({
                        text:
                          threeItem.ActivityCount > 0
                            ? `${threeItem.Name}   `
                            : threeItem.Name,
                        ActivityCount: threeItem.ActivityCount
                      });
                      childrenChildren.push({
                        text:
                          threeItem.ChildrenCount > 0
                            ? `${threeItem.Name}   `
                            : threeItem.Name,
                        ChildrenCount: threeItem.ChildrenCount
                      });
                    });
                  }
                  areaTemp.children.push({
                    text:
                      areaItem.ActivityCount > 0
                        ? `${areaItem.Name}  `
                        : areaItem.Name,
                    children: activityChildren,
                    ActivityCount: areaItem.ActivityCount
                  });
                  childrenTemp.children.push({
                    text:
                      areaItem.ChildrenCount > 0
                        ? `${areaItem.Name}  `
                        : areaItem.Name,
                    children: childrenChildren,
                    ChildrenCount: areaItem.ChildrenCount
                  });
                });
              }
              this.areaItems.push(areaTemp);
              this.childrenItems.push(childrenTemp);
              console.log("this.areaItems", this.areaItems);
              console.log("this.childrenItems", this.childrenItems);
            });
            this.showOverlay = false;
          })
          .catch(err2 => {
            console.log("getTreeCount", err2);
            this.showOverlay = false;
          });
      })
      .catch(err => {
        console.log("getTotalCount", err);
        this.showOverlay = false;
      });
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  watch: {
    activeTab(val) {
      this.showCurrentDown = "";
      this.showSecondCurrentDown = "";
      this.showChild = "";
      this.showSecondChild = "";
      if (val === 2) {
        this.showOverlay = true;
        getTopChildrenHomeList(this.cityId)
          .then(res => {
            console.log("getTopChildrenHomeList", res);
            this.topChildrenHomeList = res.data.topChildrenHomeList;
            this.showOverlay = false;
          })
          .catch(err => {
            console.log("getTotalCount", err);
            this.showOverlay = false;
          });
      }
    }
  },
  methods: {
    goDetail(childrenHome) {
      this.$store.commit("common/getVillageId", childrenHome.VillageId);
      this.$router.push({
        name: "childrenHomeDetail",
        query: {
          currentPath: "careIndex"
        }
      });
    },
    collapseDown(data, index) {
      if (this.showCurrentDown === index) {
        this.showCurrentDown = "";
        this.showChild = "";
      } else {
        this.showCurrentDown = index;
        this.showChild = index;
      }

      console.log(data);
    },
    collapseSecondDown(data, index) {
      if (this.showSecondCurrentDown === index) {
        this.showSecondCurrentDown = "";
        this.showSecondChild = "";
      } else {
        this.showSecondCurrentDown = index;
        this.showSecondChild = index;
      }

      console.log(data);
    }
  }
};
</script>

<style lang="less">
.careIndexPage {
  width: 100%;
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
  .gapone {
    height: 1px;
  }
  .gaptwo {
    height: 2px;
  }
  .gapten {
    height: 15px;
  }
  .careIndexTitle {
    text-align: left;
    padding: 10px 20px;
  }
  .green {
    color: #0cce0c;
    font-size: 28px;
  }
  .gray {
    color: #c1c1c1;
    font-size: 12px;
  }
  .item {
    padding: 20px;
  }
  .careIndexTabs {
    /deep/.van-tabs__line {
      width: 34% !important;
    }
    /deep/.van-cell__title {
      text-align: left;
    }
    .three {
      /deep/.van-cell__right-icon {
        display: none;
      }
    }
    .childrenMaster {
      /deep/.van-cell__title {
        text-align: left;
        flex: 2;
      }
      /deep/.van-cell__value {
        flex: 1;
      }
    }
    .childrenMastertableHead {
      padding: 10px 30px;
      font-size: 16px;
      font-weight: 900;
    }
  }
}
</style>