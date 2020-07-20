<template>
  <div class="childrenHomeDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="childrenHomePageHead">
      <div class="flex space-between"></div>
    </div>
    <div class="gap gapfive"></div>
    <div class="myChildrenHome">
      <div v-if="imageList.length>0">
        <img src alt />
      </div>
      <div class="myChildrenHometips">儿童之家形象照</div>
    </div>
    <div class="gap gapfive"></div>
    <div class="childrenHomeList">
      <div class="flex childrenHomeItemName">
        <van-icon name="wap-home" color="#24b369" />
        <div class="name">{{childrenHome.Name}}</div>
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
            <div class="custom-title">{{childrenHome.ChildrenCount}}人</div>
            <div>{{childrenHome.ActivityCount}}次</div>
            <div>
              <ul class="cleanfloat flex">
                <li
                  v-for="(n,index) in 5"
                  :key="index"
                  :class="[index+1>starNum?'grayStar':'star']"
                >★</li>
              </ul>
            </div>
          </div>
          <div
            class="position"
          >位置：{{childrenHome.ProvinceName.Name}} >{{childrenHome.CityeName.Name}} >{{childrenHome.AreaName.Name}} >{{childrenHome.TownName.Name}} >{{childrenHome.VillageName.Name}}</div>
        </template>
      </van-cell>
    </div>
    <div class="gap gaptwenty"></div>
    <div style="padding: 20px;">
      <div class="flex space-between">
        <div style="text-align: left;font-size: 18px;font-weight: 600;">儿童之家成员</div>
        <!-- <div style="color: #2c518a;" @click="addChildren">新建成员</div> -->
      </div>
    </div>
    <div class="flex space-between" style="padding:20px 20px 10px;">
      <div class="childrenHomeMemberHead" style="flex:1;text-align: left;">儿童</div>
      <div class="childrenHomeMemberHead" style="flex:1;">监护人</div>
      <div class="childrenHomeMemberHead" style="flex:1;text-align: right;">操作</div>
    </div>
    <div>
      <van-cell
        class="childrenHomeMember"
        v-for="(child,index) in childrenList"
        :key="index"
        style="border-bottom: 1px solid #efefef;"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="flex space-between">
            <div class="childHead">
              <img src="../assets/nohead.png" class="head" alt />
              <div class="name">{{child.Name}}</div>
            </div>
            <div class="guardianName">{{child.ParentUser.Name}}</div>
            <div class="operation">
              <van-icon name="ellipsis" @click="showMore(child)" />
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="gap gapone"></div>
    <div style="padding: 20px;">
      <div class="flex space-between">
        <div style="font-size: 18px;font-weight: 600;">管理员信息</div>
        <div style="color:gray;">{{userList.length}}名</div>
      </div>
      <div>
        <div class="activityRecordUser">
          <!-- <div class="activityRecordUserHead">
              <div style="color: #ffb100;">暂无头像</div>
          </div>-->
          <div
            v-for="(user,index) in userList"
            :key="index"
            class="flex space-between"
            style="padding: 10px;"
          >
            <div class="flex">
              <img src="../assets/nohead.png" alt style="40px;height:40px;margin-top: 5px;" />
              <div style="text-align: left;padding-left: 10px;">
                <div style="padding: 0 10px;">{{user.Name}}</div>
                <div
                  class="will"
                  style="padding: 5px 10px;border-radius: 14px;font-size: 13px;"
                >{{user.Type===4?'村级管理员':user.Type===7?'志愿者':user.Type===3?'镇级管理员':user.Type===2?'县级管理员':user.Type===1?'市级管理员':user.Type===6?'助理':'村级讲师'}}</div>
              </div>
            </div>
            <div>
              <van-button type="default" @click="callConfirm(user.Phone)">拨打电话</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom:30px;">
      <div class="flex space-between" style="padding: 20px;">
        <div style="font-size: 18px;font-weight: 600;">儿童之家活动</div>
        <div style="color:gray;">{{activityList.length}}场</div>
      </div>
      <div v-if="activityTotal>0">
        <div v-for="(item,index) in activityList" :key="index">
          <div class="flex space-between">
            <div style="padding:20px;">
              <van-icon name="underway" v-if="item.Status===1" />
              <van-icon name="checked" v-else :class="item.Status===3?'gry':''" />
              {{getDate(item.Date)}}
            </div>
            <div class="status will" v-if="item.Status===1">即将开始</div>
            <div class="status ing" v-else-if="item.Status===2">进行中</div>
            <div class="status finished" v-else>已结束</div>
          </div>
          <div class="abbreviation">{{item.Name}}</div>
          <div class="flex" @click="viewDetail(item)">
            <img
              :src="activityImg.Url"
              v-for="(activityImg,turn) in item.ActivityImage.slice(0,3)"
              :key="turn"
              style="width: 80px;height: 100px;padding: 15px 20px;"
            />
            <div v-if="item.ActivityImage.length>0">...</div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
    <van-popup v-model="showPicker" position="bottom" round>
      <div style="padding:20px;color: #a0a0a0;font-size: 14px;">{{currentParentUserTel}}</div>
      <div class="gap gapone"></div>
      <div class="call" style="padding:20px;" @click="callPhone">
        <a :href="`tel:${currentParentUserTel}`"></a>
        呼叫
      </div>
      <div class="gap gapfive"></div>
      <div class="cancel" style="padding:20px;" @click="cancel">取消</div>
    </van-popup>
    <van-dialog v-model="showDialog" :show-cancel-button="true" :showConfirmButton="false">
      <div class="operationDialogList">
        <!-- <div class="item">
          <div class="itemContent" @click="edit">编辑信息-{{currentChildName}}</div>
        </div>
        <div class="item" @click="deleteConfirm">
          <div class="itemContent">删除信息-{{currentChildName}}</div>
        </div>-->
        <div class="item" @click="callConfirm(currentParentUserTel)">
          <div class="itemContent">联系监护人手机-{{currentParentUser.Name}}</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { getChildrenHomeDetail } from "@/api/home";
export default {
  name: "childrenHomeDetail",
  data() {
    return {
      childrenHome: [],
      childrenList: [],
      activityList: [],
      userList: [],
      imageList: [],
      starNum: 0,
      showOverlay: false,
      activityTotal: "",
      showPicker: false,
      currentParentUserTel: "",
      showDialog: false,
      currentParentUser: ""
    };
  },
  computed: {
    VillageId() {
      return this.$store.state.common.VillageId;
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
    Select() {
      return this.$store.state.common.Select;
    }
  },
  mounted() {
    if (this.$route.query.select)
      this.$store.commit("common/getSelect", this.$route.query.select);
    this.showOverlay = true;
    getChildrenHomeDetail(this.VillageId)
      .then(res => {
        console.log("getChildrenHomeDetail", res);
        this.childrenHome = res.data.childrenHome;
        this.activityTotal = res.data.activityTotal;
        if (this.activityTotal > 0) this.activityList = res.data.activitylist;
        if (res.data.childrenHome.ChildrenCount > 0)
          this.childrenList = res.data.childrenList;
        this.userList = res.data.userList;
        this.imageList = res.data.imageList;
        this.starNum = this.childrenHome.Score / 10;
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("err", err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      console.log(
        "this.$route.query.currentPath",
        this.$route.query.currentPath,
        this.PreCurrentPath
      );
      if (this.$route.query.currentPath) {
        this.$router.push({
          name: this.$route.query.currentPath,
          query: {
            activeTab: this.$route.query.currentPath === "careIndex" ? 2 : 0,
            selected: this.Select
          }
        });
      } else {
        this.$router.push({
          name: this.PreCurrentPath,
          // name: "socialParticipation",
          query: {
            activeTab: this.PreCurrentPath === "careIndex" ? 2 : 0,
            selected: this.Select
          }
        });
      }
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    viewDetail(row) {
      if (this.$route.query.currentPath)
        this.$store.commit(
          "common/getPreCurrentPath",
          this.$route.query.currentPath
        );
      this.$router.push({
        name: "activityDetail",
        query: {
          Id: row.Id,
          currentPath: "childrenHomeDetail"
        }
      });
    },
    callConfirm(tel) {
      if (tel) this.currentParentUserTel = tel;
      this.showPicker = true;
      this.showDialog = false;
    },
    callPhone() {
      window.location.href = `tel:${this.currentParentUserTel}`;
    },
    cancel() {
      this.showPicker = false;
    },
    showMore(child) {
      console.log("child", child);
      this.showDialog = true;
      // this.currentChildId = child.Id;
      // this.currentChildName = child.Name;
      this.currentParentUser = child.ParentUser;
      this.currentParentUserTel = child.ParentUser.Phone;
    }
  }
};
</script>

<style lang="less">
.childrenHomeDetailPage {
  .myChildrenHome {
    height: 160px;
    background: #e6e6e6;
    position: relative;
    .myChildrenHometips {
      position: absolute;
      right: 30px;
      bottom: 20px;
      background: #808080ad;
      padding: 5px 20px;
      border-radius: 30px;
      font-size: 12px;
      color: #fff;
      font-weight: 100;
    }
  }
  .childrenHomeItemName {
    padding: 20px;
    line-height: 21px;
    .name {
      padding-left: 10px;
    }
  }
  .childrenHomeList {
    .childrenMastertableHead {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .childrenHomeMember {
    .childHead {
      display: flex;
      margin-left: 1%;
      flex: 1;
      .head {
        width: 20px;
        height: 20px;
        padding-right: 5px;
      }
      .name {
        line-height: 20px;
      }
    }
    .guardianName {
      // margin-left: -7%;
      flex: 1;
    }
    .operation {
      padding: 0 10px;
      flex: 1;
      text-align: right;
    }
  }
  .childrenMaster {
    padding: 10px 20px;
  }
  .abbreviation {
    text-align: left;
    padding: 0 20px;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .star {
    color: #fbb32f;
    line-height: 30px;
  }
  .grayStar {
    color: #e0e0e0;
    line-height: 30px;
  }

  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapfive {
    height: 5px;
  }
  .gapone {
    height: 1px;
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
  .operationDialogList {
    .item {
      border-bottom: 1px solid #efefef;
      .itemContent {
        padding: 20px;
      }
    }
  }
}
</style>