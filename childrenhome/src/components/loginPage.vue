<template>
  <div class="loginPage">
    <div>
      <van-tabs class="inputList" v-model="activeTab">
        <van-tab title="验证码登录">
          <div class="inputItem">
            <van-field
              v-model="tel"
              :error-message="phoneErr"
              type="tel"
              left-icon="phone"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="code"
              :error-message="codeErr"
              type="number"
              left-icon="lock"
              placeholder="请输入验证码"
            >
              <template #button>
                <van-button
                  size="small"
                  type="default"
                  @click="getCode"
                  :disabled="disabledBtn"
                >{{codeText}}</van-button>
              </template>
            </van-field>
          </div>
          <div style="padding: 20px 20px 10px;">
            <van-button
              class="loginButton"
              style="width:100%"
              type="warning"
              color="#ffbf00"
              @click="login"
            >立即登录</van-button>
          </div>
          <div style="font-size:12px;">！请接收验证码登录</div>
        </van-tab>
        <van-tab title="账户密码登录">
          <van-field v-model="tel" type="tel" left-icon="phone" placeholder="请输入手机号" />
          <van-field v-model="password" type="number" left-icon="lock" placeholder="请输入密码" />
          <div style="padding: 20px 20px 10px;">
            <van-button style="width:100%" type="warning" color="#02437b">立即登录</van-button>
          </div>
          <div style="font-size:12px;">！请输入密码登录</div>
        </van-tab>
      </van-tabs>
      <div class="footer_init">
        <div>技术支持：深圳全家学教育科技有限公司</div>
        <div>copyright © 2018-2020 Quanjiaxue Tech Co.ltd</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVerifyCode, login } from "@/api/home";
export default {
  name: "loginPage",
  data() {
    return {
      activeTab: 0,
      tel: "",
      code: "",
      password: "",
      phoneErr: "",
      codeErr: "",
      disabledBtn: false,
      timer: null,
      count: "",
      codeText: "发送验证码"
    };
  },
  methods: {
    login() {
      if (this.tel === "") return (this.phoneErr = "手机号不能为空");
      this.phoneErr = "";
      if (this.code === "") return (this.codeErr = "验证码不能为空");
      this.codeErr = "";
      login(this.tel, this.code).then(res => {
        console.log("login", res);
        if (res.data.code > 0) {
          this.$notify({
            type: "warning",
            message: res.data.msg,
            duration: 2000
          });
        } else {
          this.$router.push({
            name: "childrenHomePage",
            query: {
              token: res.data.token
            }
          });
        }
      });
    },
    getCode() {
      if (this.tel === "") return (this.phoneErr = "不能为空");
      if (this.checkPhone(this.phoneErr)) {
        const TIME_COUNT = 60;
        this.disabledBtn = true;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.codeText = `${this.count}s后重发`;
            } else {
              this.disabledBtn = false;

              clearInterval(this.timer);
              this.codeText = "重新发送验证码";
              this.timer = null;
            }
          }, 1000);
        }
        getVerifyCode(this.tel).then(res => {
          console.log("code", res);
          this.$notify({
            type: "success",
            message: "发送成功",
            duration: 1000
          });
        });
      }
    },
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.phoneErr = "手机号码有误，请重填";
        return false;
      } else {
        this.phoneErr = "";
        return true;
      }
    }
  }
};
</script>

<style lang="less">
.loginPage {
  .inputList {
    // margin-top: 60px;
    /deep/.van-tabs__wrap {
      padding-top: 60px;
    }
    /deep/.van-tabs__line {
      width: 50% !important;
    }
    .inputItem {
      padding: 0 10px;
    }
  }

  .footer_init {
    color: #adadad;
    margin-top: 80px;
    font-size: 12px;
  }
  .loginButton {
    /deep/.van-button__text {
      color: black !important;
    }
  }
}
</style>