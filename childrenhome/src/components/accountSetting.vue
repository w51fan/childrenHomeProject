<template>
  <div class="accountSettingPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title">我的信息</div>
    <div class="gap gapone"></div>
    <div class="content">
      <van-cell title="姓名" class="userName">
        <template #default>
          <!-- <img class="head" src="../assets/nohead.png" alt /> -->
          <van-field v-model="userName" placeholder="请输入姓名" input-align="right" />
        </template>
      </van-cell>
      <van-cell title="身份" value="村级管理员" />
      <van-cell title="头像">
        <template #default>
          <!-- <img class="head" src="../assets/nohead.png" alt /> -->
          <van-uploader :after-read="afterRead">
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
    this.userName = this.User.Name;
    this.userImg =
      this.User.ProfilePhoto !== "" ? this.User.ProfilePhoto : this.noheadImg;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "childrenHomePage"
      });
    },
    logout() {
      this.$dialog.alert({
        title: "退出登录",
        message: "是否确认退出当前账号？",
        showCancelButton: true,
        beforeClose
      });
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 1000);
        } else {
          console.log("done", false);
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
        this.User.name = this.userName;
        this.User.ProfilePhoto = this.userImg;
        this.$store.commit("common/getUser", this.User);
        this.$notify({
          type: "success",
          message: res.data.msg,
          duration: 500
        });
        setTimeout(() => {
          this.showOverlay = false;
          this.$router.push({
            name: "childrenHomePage"
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