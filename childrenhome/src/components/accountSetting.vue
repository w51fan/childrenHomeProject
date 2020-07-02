<template>
  <div class="accountSettingPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title">我的信息</div>
    <div class="gap gapone"></div>
    <div class="content">
      <van-cell title="姓名" class="userName" >
        <template #default>
          <!-- <img class="head" src="../assets/nohead.png" alt /> -->
          <van-field v-model="userName"  placeholder="请输入姓名" input-align="right" />
        </template>
      </van-cell>
      <van-cell title="身份" value="村级管理员" />
      <van-cell title="头像">
        <template #default>
          <!-- <img class="head" src="../assets/nohead.png" alt /> -->
          <van-uploader :after-read="afterRead">
            <div class="flex">
              <img class="head" src="../assets/nohead.png" alt />
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
  </div>
</template>

<script>
import { updateUser,uploadImg } from "@/api/home";
export default {
  name: "accountSetting",
  data() {
    return {
      userName:'123'
    };
  },
  computed: {
    token() {
      return this.$store.state.common.token;
    }
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
      updateUser({
        token:this.token
      }).then(res => {
        console.log("updateUser", res);
      });
    },
    afterRead(file){
      console.log('file',file)
      uploadImg(file.content).then(res=>{
        console.log('uploadImg',res)
      })
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
    .userName{
      .van-cell__title{
        line-height: 44px;
      }
      .van-cell{
        padding: 10px 3px;
      }
    }
  }
  .head {
    width: 25px;
    height: 25px;
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