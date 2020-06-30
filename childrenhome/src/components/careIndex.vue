<template>
  <div style="width:100%;">
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
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item
            :title="area.text"
            :name="index+1"
            v-for="(area,index) in areaItems"
            :key="index"
          >
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item
                :title="child.text"
                :name="turn+1"
                v-for="(child,turn) in area.children"
                :key="turn"
              >
                <van-collapse class="three" v-model="activeNames3">
                  <van-collapse-item
                    :title="three.text"
                    :name="num+1"
                    v-for="(three,num) in child.children"
                    :key="num"
                  ></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="儿童统计">
        <div class="gap gaptwo"></div>
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item
            :title="area.text"
            :name="index+1"
            v-for="(area,index) in childrenItems"
            :key="index"
          >
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item
                :title="child.text"
                :name="turn+1"
                v-for="(child,turn) in area.children"
                :key="turn"
              >
                <van-collapse class="three" v-model="activeNames3">
                  <van-collapse-item
                    :title="three.text"
                    :name="num+1"
                    v-for="(three,num) in child.children"
                    :key="num"
                  ></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="儿童主任">
        <div class="gap gaptwo"></div>
        <div class="flex space-between">
          <div class="childrenMastertableHead">儿童之家</div>
          <div class="childrenMastertableHead">儿童主任</div>
          <div class="childrenMastertableHead">评分</div>
        </div>
        <div class="gap gapone"></div>
        <van-cell class="childrenMaster" value="91分" is-link @click="goDetail">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="flex space-between">
              <div class="custom-title">立新村儿童之家</div>
              <div>岳海燕</div>
            </div>
          </template>
        </van-cell>
      </van-tab>
    </van-tabs>
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
import { getTotalCount, getTreeCount } from "@/api/home";
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
      childerenHomeList: []
    };
  },
  mounted() {
    getTotalCount(this.cityId).then(res => {
      // console.log(res);
      this.totalCount = res.data.totalCount;
      getTreeCount(this.cityId).then(result => {
        // console.log(result);
        this.areaList = result.data.areaList;
        this.areaList.forEach(item => {
          let areaTemp = {
            text:
              item.ActivityCount > 0
                ? `${item.Name}   (${item.ActivityCount}场)`
                : item.Name,
            children: []
          };
          let childrenTemp = {
            text:
              item.ChildrenCount > 0
                ? `${item.Name}   (${item.ChildrenCount}人)`
                : item.Name,
            children: []
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
                        ? `${threeItem.Name}   (${threeItem.ActivityCount}场)`
                        : threeItem.Name
                  });
                  childrenChildren.push({
                    text:
                      threeItem.ChildrenCount > 0
                        ? `${threeItem.Name}   (${threeItem.ChildrenCount}人)`
                        : threeItem.Name
                  });
                });
              }
              areaTemp.children.push({
                text:
                  areaItem.ActivityCount > 0
                    ? `${areaItem.Name}   (${areaItem.ActivityCount}场)`
                    : areaItem.Name,
                children: activityChildren
              });
              childrenTemp.children.push({
                text:
                  areaItem.ChildrenCount > 0
                    ? `${areaItem.Name}   (${areaItem.ChildrenCount}人)`
                    : areaItem.Name,
                children: childrenChildren
              });
            });
          }
          this.areaItems.push(areaTemp);
          this.childrenItems.push(childrenTemp);
        });
        // console.log("this.areaItems", this.areaItems);
      });
    });
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId;
    }
  },
  methods: {
    onItemClick() {},
    goDetail() {
      this.$router.push({
        name: "childrenHomeDetail"
        // query: {
        //   Id: course.CourseId
        // }
      });
    }
  }
};
</script>

<style lang="less">
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
  padding: 20px 25px;
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
</style>