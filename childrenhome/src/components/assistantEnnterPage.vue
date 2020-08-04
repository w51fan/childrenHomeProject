<template>
  <div class="assistantEnnterPage">
    <img src="http://minzheng.oss-cn-beijing.aliyuncs.com/cover.jpg" alt />
    <van-tabs v-model="activeTab" class="ennterPageTabs">
      <van-tab title="系统介绍">
        <div class="introduceContent">{{introduceContent}}</div>
      </van-tab>
      <van-tab title="功能亮点">
        <div class="function">
          <div>平台功能：</div>
          <div style="font-size: 15px;">
            <div>（一）实时监控儿童之家工作动态</div>
            <div>（二）社会宣传与展示</div>
          </div>

          <div>亮点：</div>
          <div style="font-size: 15px;">
            <div>（一）权威定制的专家课程</div>
            <div>（二）先进的管理后台，学习进度跟踪，活动实时干预</div>
            <div>（三）手机导入信息，简便易操</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="fix" @click="go">
      <div>进入平台 > ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assistantEnnterPage",
  data() {
    return {
      activeTab: "",
      introduceContent:
        "儿童关爱行动平台是一套网络信息化管理系统，除了进行儿童信息采集外，通过建立市、县、乡、村四级监督考核系统、评估系统，还可以对儿童问题和动态及时关注、及时干预，及时解决，及时反馈。此系统包括管理端（PC）、展示端（用于展示民政系统对外数据和新闻发布）以及手机管理端（用户管理、上报儿童信息、发布儿童之家活动以及观看家庭教育视频）三个客户端。"
      // functionContent:"",
    };
  },
  methods: {
    go() {
      this.$router.push({
        name: "loginPage"
      });
    }
  }
};
</script>

<style lang="less">
.assistantEnnterPage {
  img {
    width: 100%;
  }
  .fix {
    position: fixed;
    text-align: center;
    width: 100%;
    bottom: 0px;
    padding: 15px 20px;
    background: #ffb103;
    color: white;
    font-size: 16px;
    font-weight: 600;
  }
  .introduceContent {
    text-align: left;
    padding: 20px;
  }
  .function {
    text-align: left;
    padding: 20px;
  }
  .ennterPageTabs {
    /deep/.van-tabs__line {
      width: 40% !important;
    }
  }
}
</style>