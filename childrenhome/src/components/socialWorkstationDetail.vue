<template>
  <div class="socialWorkstationDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="childrenHomePageHead">
      <div class="flex space-between"></div>
    </div>
    <!-- <div class="gap gapfive"></div> -->
    <div class="myChildrenHome">
      <div v-if="ChildrenHomeImg!==''" style="position: absolute;">
        <img :src="ChildrenHomeImg" alt />
      </div>
      <van-uploader
        class="uploaderImg"
        :after-read="afterRead"
        :max-size="2 * 1024 * 1024"
        @oversize="onOversize"
        v-if="UserTpye===12"
      >
        <template slot="default">
          <div class="myChildrenHometips">点击更换形象照</div>
        </template>
      </van-uploader>
      <!-- <div class="myChildrenHometips">点击更换形象照</div> -->
    </div>
    <!-- <div class="gap gapfive"></div> -->
    <div class="childrenHomeList">
      <div class="flex childrenHomeItemName">
        <van-icon name="wap-home" color="#24b369" />
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
                  :class="[index+1>starNum?'grayStar':'star']"
                >★</li>
              </ul>
            </div>
          </div>
          <div
            class="position"
          >位置：{{socialStation.ProvinceName.Name}} >{{socialStation.CityeName.Name}} >{{socialStation.AreaName.Name}} >{{socialStation.TownName.Name}} >{{socialStation.VillageName.Name}}</div>
        </template>
      </van-cell>
    </div>
    <div class="gap gaptwenty"></div>
    <div style="padding: 20px;">
      <div class="flex space-between">
        <div style="text-align: left;font-size: 18px;font-weight: 600;">低保对象人员</div>
        <div style="color: #2c518a;" @click="addSubsistence" v-if="showAddSocialWorkstation">新建成员</div>
      </div>
    </div>
    <div class="flex space-between" style="padding:20px 20px 10px;">
      <div class="childrenHomeMemberHead">户主</div>
      <div class="childrenHomeMemberHead">性别</div>
      <div class="childrenHomeMemberHead">操作</div>
    </div>
    <div>
      <van-cell
        class="childrenHomeMember"
        v-for="(child,index) in subsistenceList"
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
            <div class="guardianName">{{child.Sex}}</div>
            <div class="operation">
              <van-icon name="ellipsis" @click="showMore(child)" />
            </div>
          </div>
        </template>
      </van-cell>
    </div>
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
              <div v-if="user.ProfilePhoto!==''">
                <img
                  :src="user.ProfilePhoto"
                  style="width:40px;height:40px;margin-top: 5px;object-fit: contain;border-radius: 50%;"
                  alt
                />
              </div>
              <div v-else>
                <img src="../assets/nohead.png" alt style="width:40px;height:40px;margin-top: 5px;" />
              </div>
              <div style="text-align: left;padding-left: 10px;">
                <div style="padding: 0 10px;">{{user.Name}}</div>
                <div
                  class="will"
                  style="padding: 5px 10px;border-radius: 14px;font-size: 13px;"
                >{{user.Type===4?'村级管理员':user.Type===7?'志愿者':user.Type===3?'镇级管理员':user.Type===2?'县级管理员':user.Type===1?'市级管理员':user.Type===6?'助理':user.Type===11?'家长':user.Type===12?'社区工作服务管理员':user.Type===14?'校儿童主任':user.Type===15?'校儿童督导员':'村级讲师'}}</div>
              </div>
            </div>
            <div>
              <van-button type="default" @click="callConfirm(user.Phone)">拨打电话</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 20px;">
      <div class="flex space-between">
        <div style="font-size: 18px;font-weight: 600;">社会服务工作站活动</div>
        <div style="color:gray;">{{activityTotal}}场</div>
      </div>
      <div v-if="activityTotal>0">
        <div v-for="(item,index) in activityList" :key="index">
          <div class="flex space-between">
            <div style="padding:20px 0;">
              <van-icon name="underway" v-if="item.Status===1" />
              <van-icon name="checked" v-else :class="item.Status===3?'gry':''" />
              {{getDate(item.Date)}}
            </div>
            <div class="status will" v-if="item.Status===1">即将开始</div>
            <div class="status ing" v-else-if="item.Status===2">进行中</div>
            <div class="status finished" v-else>已结束</div>
          </div>
          <div class="abbreviation" @click="viewDetail(item)">{{item.Name}}</div>
          <div class="flex" @click="viewDetail(item)" v-if="item.ActivityImage">
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
    <van-dialog v-model="showDialog" :show-cancel-button="true" :showConfirmButton="false">
      <div class="operationDialogList">
        <div class="item">
          <div class="itemContent" @click="edit">编辑信息-{{currentChildName}}</div>
        </div>
        <div class="item" @click="deleteConfirm">
          <div class="itemContent">删除信息-{{currentChildName}}</div>
        </div>
        <!-- <div class="item" v-if="currentParentUserTel!==''">
          <div class="itemContent">联系监护人手机-{{currentParentUserTel}}</div>
        </div>-->
      </div>
    </van-dialog>
    <van-dialog
      v-model="showDeleteConfirm"
      :show-cancel-button="true"
      :showConfirmButton="true"
      @confirm="deleteSubsistence"
    >
      <div style="padding:20px;">是否删除-测试-低保对象信息</div>
    </van-dialog>
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
  </div>
</template>

<script>
import {
  getSocialstationDetail,
  uploadImg,
  deleteSubsistence
} from "@/api/home";
export default {
  name: "socialWorkstationDetail",
  data() {
    return {
      socialStation: {},
      subsistenceList: [],
      subsistenceList: [],
      activityList: [],
      userList: [],
      imageList: [],
      starNum: 0,
      activityTotal: "",
      ChildrenHomeImg: "",
      showAddSocialWorkstation: false,
      showOverlay: false,
      showDialog: false,
      showDeleteConfirm: false,
      showPicker: false,
      currentChildId: "",
      currentParentUserTel: "",
      currentChildName: ""
    };
  },
  computed: {
    SocialStationId() {
      return this.$store.state.common.SocialStationId;
    },
    Token() {
      return this.$store.state.common.Token;
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
    UserTpye() {
      return this.$store.state.common.UserTpye;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.showOverlay = true;
      // console.log('this.$route.query.isAssistant',this.$route.query.isAssistant)
      if (this.$route.query.isAssistant) {
        // console.log('this.$route.query.isAssistant222',this.$route.query.isAssistant)
        this.showAddSocialWorkstation = true;
      }
      getSocialstationDetail(this.SocialStationId)
        .then(res => {
          console.log("getSocialstationDetail", res);
          this.$store.commit(
            "common/getSocialStationId",
            res.data.socialStation.Id
          );
          this.socialStation = res.data.socialStation;
          this.subsistenceList = res.data.subsistenceList;
          this.activityTotal = res.data.activityTotal;
          if (this.activityTotal > 0) this.activityList = res.data.activitylist;
          if (res.data.socialStation.SubsistenceCount > 0)
            this.subsistenceList = res.data.subsistenceList;
          this.userList = res.data.userList;
          // this.imageList = res.data.imageList;
          // if (this.imageList.length > 0)
          //   this.ChildrenHomeImg = this.imageList[0].URL;
          this.starNum = this.socialStation.Score / 10;
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
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
            activeTab: this.$route.query.currentPath === "careIndex" ? 3 : 0
          }
        });
      } else {
        this.$router.push({
          name: this.PreCurrentPath,
          query: {
            activeTab: this.PreCurrentPath === "careIndex" ? 3 : 0
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
      console.log(row);
      if (this.$route.query.currentPath)
        this.$store.commit(
          "common/getPreCurrentPath",
          this.$route.query.currentPath
        );
      if (row.Status === 2) {
        this.$router.push({
          name: "unfinishedActivity",
          query: {
            activityId: row.Id,
            currentPath: "socialWorkstationDetail",
          }
        });
      } else {
        this.$router.push({
          name: "activityDetail",
          query: {
            activityId: row.Id,
            currentPath: "socialWorkstationDetail",
          }
        });
      }
    },
    edit() {
      if (this.$route.query.currentPath)
        this.$store.commit(
          "common/getPreCurrentPath",
          this.$route.query.currentPath
        );
      this.$router.push({
        name: "addLowIncomePerson",
        query: {
          SubsistenceID: this.currentChildId,
          currentPath: "assistantChildrenHomeDetail"
        }
      });
    },
    showMore(child) {
      if (!this.showAddSocialWorkstation) {
        this.$notify({
          type: "warning",
          message: "无权限操作",
          duration: 1000
        });
        return;
      }
      this.showDialog = true;
      this.currentChildId = child.Id;
      this.currentChildName = child.Name;
      // this.currentParentUser = child.ParentUser;
      this.currentParentUserTel = child.Contact;
    },
    afterRead(file) {
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        this.ChildrenHomeImg = res.data.url;
        console.log("uploadImg", res);
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
    },
    addSubsistence() {
      if (this.$route.query.currentPath)
        this.$store.commit(
          "common/getPreCurrentPath",
          this.$route.query.currentPath
        );
      this.$router.push({
        name: "addLowIncomePerson",
        query: {
          currentPath: "assistantChildrenHomeDetail"
        }
      });
    },
    deleteConfirm() {
      this.showDialog = false;
      this.showDeleteConfirm = true;
    },
    deleteSubsistence() {
      this.showOverlay = true;
      deleteSubsistence(this.Token, this.currentChildId)
        .then(res => {
          console.log("deleteChildren", res);
          if (res.data.code > 1) {
            this.$notify({
              type: "warning",
              message: res.data.error,
              duration: 1000
            });
            this.showOverlay = false;
          } else {
            this.$notify({
              type: "success",
              message: res.data.msg,
              duration: 1000
            });
            this.init();
          }
        })
        .catch(err => {
          console.log("deleteChildren", err);
          this.showOverlay = false;
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
    onOversize(file) {
      // console.log('onOversize',file);
      this.$notify({
        type: "warning",
        message: "图片大小不能超过2M",
        duration: 1500
      });
    }
  }
};
</script>

<style lang="less">
.socialWorkstationDetailPage {
  position: relative;
  .myChildrenHome {
    height: 200px;
    background: #e6e6e6;
    position: relative;
    img {
      height: 200px;
      object-fit: fill;
      width: 100%;
    }
    .uploaderImg {
      position: relative;
      .myChildrenHometips {
        position: absolute;
        right: -22vh;
        bottom: -21vh;
        width: 85px;
        background: #808080ad;
        padding: 5px 20px;
        border-radius: 30px;
        font-size: 12px;
        color: #fff;
        font-weight: 100;
      }
      input {
        right: -29vh;
        bottom: -39vh;
        width: 125px;
        height: 26px;
        position: absolute;
        margin: auto;
      }
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
    .position {
      font-size: 12px;
      color: #b9b8b8;
      padding: 30px 0;
    }
  }
  .childrenMaster {
    padding: 10px 20px;
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
  .gaptwenty {
    height: 20px;
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