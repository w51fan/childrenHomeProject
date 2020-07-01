<template>
  <div class="childrenHomePage">
    <div class="childrenHomePageHead">
      <div class="flex space-between">
        <div class="head flex">
          <div>
            <div v-if="user.ProfilePhoto!==''">
              <img src alt />
            </div>
            <div v-else>
              <img src="../assets/nohead.png" alt />
            </div>
          </div>
          <div>
            <div class="name">{{user.Name}}</div>
            <div class="status will" style="width: 60px;margin: 0 16px;">志愿者</div>
          </div>
        </div>

        <div @click="goSetting">
          <van-cell value="账号设置" is-link style="margin-top: 10px;" />
        </div>
      </div>
    </div>
    <div class="gap gapfive"></div>
    <div class="myChildrenHome">
      <div>我的儿童之家</div>
    </div>
    <div class="gap gapfive"></div>
    <div class="childrenHomeList">
      <div>
        <div v-for="(childrenHome,index) in childrenHomeList" :key="index" class="childrenHomeItem">
          <div class="flex childrenHomeItemName">
            <img src="../assets/smile.png" alt />
            <div class="name">{{childrenHome.Name}}</div>
          </div>
          <div class="gap gapone"></div>
          <div class="flex space-between" style="padding:20px 20px 10px;">
            <div class="childrenMastertableHead">人数</div>
            <div class="childrenMastertableHead">活动次数</div>
            <div class="childrenMastertableHead">评分</div>
          </div>
          <van-cell class="childrenMaster" @click="goChildrenHomeDetail">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="flex space-between">
                <div class="custom-title">{{childrenHome.ChildrenCount}}人</div>
                <div>{{childrenHome.ActivityCount}}次</div>
                <div>
                  <ul class="cleanfloat flex star">
                    <li>★</li>
                    <li>★</li>
                    <li>★</li>
                    <li>★</li>
                    <li>★</li>
                  </ul>
                </div>
              </div>
            </template>
          </van-cell>
          <div class="gap gaptwo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getChildrenHomeList } from "@/api/home";
export default {
  name: "childrenHomePage",
  data() {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTYxMDYzNjMsImlhdCI6MTU5MzUxNDM2MywiaWQiOjI0NjMwLCJuYW1lIjoi5LiA5biGIiwicGhvbmUiOiIxMzQzMDIwMjYyMSIsInByb2ZpbGVfcGhvdG8iOiIifQ.CcCcf1s0cQ09esbvV-IsLdu_rh0BI2yNQ0muwsqQt7U",
      user: "",
      childrenHomeList: []
    };
  },
  mounted() {
    getUserInfo(this.token).then(res => {
      console.log("getUserInfo", res);
      this.user = res.data.user;
      getChildrenHomeList(this.token).then(result => {
        console.log("getChildrenHomeList", result);
        this.childrenHomeList = result.data.childrenHomeList;
      });
    });
  },
  methods: {
    goChildrenHomeDetail() {},
    goSetting(){
       this.$router.push({
        name: "accountSetting"
      });
    }
  }
};
</script>

<style lang="less">
.childrenHomePage {
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
  .childrenHomeList {
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
    }
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