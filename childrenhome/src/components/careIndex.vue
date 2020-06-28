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
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item title="双清区(33)" name="1">
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item title="温州(11)" name="1">
                <van-collapse v-model="activeNames3">
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
              <van-collapse-item title="深圳(11)" name="2">
                <van-collapse v-model="activeNames2" accordion>
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item title="大祥区(22)" name="2">
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item title="温州(11)" name="1">
                <van-collapse v-model="activeNames3">
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
              <van-collapse-item title="深圳(11)" name="2">
                <van-collapse v-model="activeNames2" accordion>
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item title="北塔区(22)" name="3">
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item title="温州(11)" name="1">
                <van-collapse v-model="activeNames3">
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
              <van-collapse-item title="深圳(11)" name="2">
                <van-collapse v-model="activeNames2" accordion>
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item title="新邵县(22)" name="4">
            <van-collapse v-model="activeNames2" accordion>
              <van-collapse-item title="温州(11)" name="1">
                <van-collapse v-model="activeNames3">
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
              <van-collapse-item title="深圳(11)" name="2">
                <van-collapse v-model="activeNames2" accordion>
                  <van-collapse-item title="温州(11)" name="1"></van-collapse-item>
                  <van-collapse-item title="深圳(11)" name="2"></van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="儿童统计">儿童统计</van-tab>
      <van-tab title="儿童主任">儿童主任</van-tab>
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
      areaItems: [
        {
          text: "双清区（22）",
          children: [{ text: "温州（11）" }, { text: "深圳（11）" }]
        },
        { text: "大祥区", children: [] },
        {
          text: "北塔区",
          children: [
            {
              text: "温州",
              children: [
                {
                  text: "温州（11）",
                  children: [{ text: "温州（11）" }, { text: "深圳（11）" }]
                },
                { text: "深圳（11）" }
              ]
            },
            { text: "深圳" }
          ]
        },
        { text: "新邵县", children: [{ text: "温州" }, { text: "深圳" }] }
      ]
    };
  },
  mounted() {
    getTotalCount(2018).then(res => {
      console.log(res);
      this.totalCount = res.data.totalCount;
      getTreeCount(2018).then(result => {
        console.log(result);
        this.areaList = result.data.areaList;
        this.areaList.forEach(item => {
          let temp = {
            text:
              item.ActivityCount > 0
                ? `${item.Name}(${item.ActivityCount})`
                : item.Name,
            children: []
          };
          if (item.Area.length > 0) {
            item.Area.forEach(areaItem => {
              temp.children.push({
                text: areaItem.Name
              });
            });
          }
        });
      });
    });
  },
  methods: {
    onItemClick() {}
  }
};
</script>

<style lang="less">
.flex {
  display: flex;
}
.gap {
  width: 100%;
  height: 8px;
  background: #e6e6e6;
}
.gapone {
  height: 1px;
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
}
</style>