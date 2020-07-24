<template>
  <div class="addActivityPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form ref="addActivityForm" validate-first @failed="onFailed">
      <div class="title">活动信息</div>
      <van-cell-group class="addActivtyTable">
        <van-field
          v-model="activityName"
          :value="activityName"
          label="活动名称"
          placeholder="请输入活动名称 "
          size="large"
          input-align="right"
          name="validator"
          required
          :error-message="activityNameErrText"
        />
        <van-field
          readonly
          clickable
          label="活动日期"
          :value="activityDate"
          placeholder="请选择活动日期"
          @click="showPick(1)"
          input-align="right"
          name="validator"
          required
          :error-message="activityDateErrText"
        />
        <van-field
          readonly
          clickable
          v-model="activityType"
          label="活动类型"
          :value="activityType"
          placeholder="请选择"
          @click="showPick(2)"
          input-align="right"
          name="validator"
          required
          :error-message="activityTypeErrText"
        />
        <div v-if="UserTpye===4">
          <van-field
            readonly
            clickable
            label="活动儿童之家"
            :value="activityHome"
            placeholder="请选择"
            @click="showPick(3)"
            input-align="right"
            name="validator"
            required
            :error-message="activityHomeErrText"
          />
        </div>
        <div v-else-if="UserTpye===12">
          <van-field
            readonly
            clickable
            label="活动工作站"
            :value="activityHome"
            placeholder="请选择"
            @click="showPick(3)"
            input-align="right"
            name="validator"
            required
            :error-message="activityHomeErrText"
          />
        </div>
      </van-cell-group>
    </van-form>
    <div class="gap gapfive"></div>
    <div style="padding:20px;">
      <van-button type="primary" color="#ffac22" style="width:100%;" @click="add">新增活动</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom" round :style="{ height: '50%' }">
      <div v-if="currentPick===2">
        <van-picker
          show-toolbar
          :columns="activityTypeArray"
          @cancel="showPicker = false"
          @confirm="onConfirmType"
        />
      </div>
      <div v-else-if="currentPick===3">
        <van-picker
          show-toolbar
          :columns="childrenHomeListArray"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </div>
      <div v-else>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmDate"
        />
      </div>
    </van-popup>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  getChildrenHomeList,
  addActivity,
  getSocialStationList
} from "@/api/home";
export default {
  name: "addActivity",
  data() {
    return {
      showOverlay: false,
      activityName: "",
      activityDate: this.getDate(new Date()),
      activityType: "",
      activityHome: "",
      showSelectedPiack: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      value: "",
      showPicker: false,
      currentPick: "",
      columns: [],
      childrenHomeListArray: [],
      childrenHomeIDListArray: [],
      activityTypeArray: [
        "家庭教育",
        "儿童团辅",
        "家庭亲子",
        "安全护卫",
        "微课"
      ],
      activityTypeIDArray: {
        家庭教育: 1,
        儿童团辅: 2,
        家庭亲子: 3,
        安全护卫: 4,
        微课: 5
      },
      activityNameErrText: "",
      activityDateErrText: "",
      activityTypeErrText: "",
      activityHomeErrText: ""
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    UserTpye() {
      return this.$store.state.common.UserTpye;
    }
  },
  watch:{
    activityName(vale){
      if (vale === "") {
        this.activityNameErrText = "请输入";
      } else {
        this.activityNameErrText = "";
      }
    },
    activityDate(vale){
      if (vale === "") {
        this.activityDateErrText = "请选择";
      } else {
        this.activityDateErrText = "";
      }
    },
    activityType(vale){
      if (vale === "") {
        this.activityTypeErrText = "请选择";
      } else {
        this.activityTypeErrText = "";
      }
    },
    activityHome(vale){
      if (vale === "") {
        this.activityHomeErrText = "请选择";
      } else {
        this.activityHomeErrText = "";
      }
    },
  },
  mounted() {
    this.showOverlay = true;
    if (this.UserTpye === 4) {
      getChildrenHomeList(this.Token)
        .then(res => {
          console.log("getChildrenHomeList", res);
          // this.childrenHomeListArray = res.data.childrenHomeList;
          res.data.childrenHomeList.forEach(element => {
            this.childrenHomeListArray.push(element.Name);
            this.childrenHomeIDListArray[element.Name] = element.Id;
          });
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("getChildrenHomeList", err);
          this.showOverlay = false;
        });
    } else {
      getSocialStationList(this.Token)
        .then(res => {
          console.log("getChildrenHomeList", res);
          // this.childrenHomeListArray = res.data.childrenHomeList;
          res.data.socialStationList.forEach(element => {
            this.childrenHomeListArray.push(element.Name);
            this.childrenHomeIDListArray[element.Name] = element.Id;
          });
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("getChildrenHomeList", err);
          this.showOverlay = false;
        });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "offlineActivity"
      });
    },
    showPick(index) {
      this.showPicker = !this.showPicker;
      this.currentPick = index;
    },
    onConfirm(value) {
      this.activityHome = value;
      this.showPicker = false;
    },
    onConfirmType(value) {
      console.log(value);
      this.activityType = value;
      this.showPicker = false;
    },
    onConfirmDate(value) {
      this.activityDate = this.getDate(value);
      this.showPicker = false;
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      let day = activityDate.getDate();
      if (day < 10) day = `0${day}`;
      return `${year}-${month}-${day}`;
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    add() {
      this.showOverlay = true;
      let $this = this;
      // console.log('this.activityTypeIDArray[this.activityType]',this.activityTypeIDArray[this.activityType])
      if (this.activityName === "") {
        this.activityNameErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.activityNameErrText = "";
      }
      if (this.activityDate === "") {
        this.activityDateErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.activityDateErrText = "";
      }
      if (this.activityType === "") {
        this.activityTypeErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.activityTypeErrText = "";
      }
      if (this.activityHome === "") {
        this.activityHomeErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.activityHomeErrText = "";
      }
      console.log('this.childrenHomeIDListArray',this.childrenHomeIDListArray)
      addActivity({
        token: this.Token,
        name: this.activityName,
        type: this.activityTypeIDArray[this.activityType],
        childrenHomeId: this.childrenHomeIDListArray[this.activityHome],
        date: this.activityDate,
        activityType: this.$route.query.activityType,
        socialStationId: this.childrenHomeIDListArray[this.activityHome],
        isChildrenHome:this.UserTpye === 4?true:false
      })
        .then(res => {
          console.log("addActivity", res);
          $this.$notify({
            type: "success",
            message: res.data.msg,
            duration: 500
          });
          setTimeout(() => {
            $this.showOverlay = false;
            $this.$router.push({
              name: "offlineActivity"
            });
          }, 1000);
        })
        .catch(err => {
          console.log("addActivity", err);
          $this.showOverlay = false;
        });
    }
  }
};
</script>

<style lang="less">
.addActivityPage {
  .title {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .addActivtyTable {
    .van-cell {
      padding: 15px 20px;
    }
    .van-field__label {
      width: 120px;
    }
    .pick {
      .van-cell__title {
        text-align: left;
        font-size: 16px;
        width: 120px;
      }
      .van-cell__value {
        text-align: left;
        .van-field__error-message {
          text-align: right;
        }
      }
    }
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapfive {
    height: 20px;
  }
}
</style>