<template>
  <div class="accountSettingPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title">我的信息</div>
    <div class="gap gapone"></div>
    <div class="content">
      <!-- <van-cell title="姓名" class="userName">
        <template #default>
          <van-field v-model="userName" placeholder="请输入姓名" input-align="right" />
        </template>
      </van-cell>-->
      <van-field
        v-model="userName"
        label="姓名"
        placeholder="请输入姓名 "
        size="large"
        input-align="right"
      />
      <van-cell title="身份" :value="userIdentity" />
      <van-cell title="头像">
        <template #default>
          <!-- <img class="head" src="../assets/nohead.png" alt /> -->
          <van-uploader :after-read="afterRead" :max-size="2 * 1024 * 1024" @oversize="onOversize">
            <div class="flex">
              <img class="head" :src="userImg" alt />
              <div class="arrow">
                <van-icon name="arrow" />
              </div>
            </div>
          </van-uploader>
        </template>
      </van-cell>
    </div>
    <div class="gap gapone"></div>
    <div style="padding:20px;">
      <van-button style="width:100%;" type="warning" @click="save">保存修改</van-button>
    </div>
    <div style="padding:0px 20px;" @click="logout">
      <van-button style="width:100%;" type="default">退出当前账户</van-button>
    </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { updateUser, uploadImg } from "@/api/home";
export default {
  name: "accountSetting",
  data() {
    return {
      userName: "",
      userImg: "",
      noheadImg: require("../assets/nohead.png"),
      showOverlay: false,
      userIdentity:''
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
    this.userName = this.User.Name;
    this.userIdentity = this.User.Type===4?'儿童主任':this.User.Type===7?'志愿者':this.User.Type===3?'镇级管理员':this.User.Type===2?'县级管理员':this.User.Type===1?'市级管理员':this.User.Type===6?'助理':this.User.Type===11?'家长':this.User.Type===12?'社区工作服务管理员':this.User.Type===14?'校儿童主任':this.User.Type===15?'校儿童督导员':'村级讲师'
    this.userImg =
      this.User.ProfilePhoto !== "" ? this.User.ProfilePhoto : this.noheadImg;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath
      });
    },
    logout() {
      let $this = this;
      this.$dialog.alert({
        title: "退出登录",
        message: "是否确认退出当前账号？",
        showCancelButton: true,
        beforeClose
      });
      function beforeClose(action, done) {
        if (action === "confirm") {
          done();
          window.localStorage.removeItem("Token");
          $this.$store.commit("common/getToken", "");

          $this.$router.push({
            name: "assistantEnnterPage"
          });
        } else {
          // console.log("done", false);
          done();
        }
      }
    },
    save() {
      this.showOverlay = true;
      updateUser({
        token: this.Token,
        name: this.userName,
        profilePhoto: this.userImg
      }).then(res => {
        console.log("updateUser", res);
        this.User.Name = this.userName;
        this.User.ProfilePhoto = this.userImg;
        let olduserData = this.User;
        console.log('olduserData',olduserData)
        olduserData.Name = this.userName;
        olduserData.ProfilePhoto = this.userImg;
        this.$store.commit("common/getUser", olduserData);
        this.$notify({
          type: "success",
          message: res.data.msg,
          duration: 500
        });
        setTimeout(() => {
          this.showOverlay = false;
          this.$router.push({
            name: this.$route.query.currentPath
          });
        }, 1000);
      });
    },
    afterRead(file) {
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        this.userImg = res.data.url;
        console.log("uploadImg", res);
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
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
.accountSettingPage {
  .title {
    text-align: left;
    padding: 20px 15px;
    font-size: 18px;
    font-weight: 600;
  }
  .content {
    text-align: left;
    .userName {
      .van-cell__title {
        line-height: 44px;
      }
      .van-cell {
        padding: 10px 3px;
      }
    }
  }
  .head {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .flex {
    display: flex;
  }
  .arrow {
    line-height: 30px;
    font-size: 16px;
    padding-left: 5px;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
}
</style>