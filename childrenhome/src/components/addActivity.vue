<template>
  <div class="addActivityPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title">活动信息</div>
    <van-cell-group class="addActivtyTable">
      <van-field v-model="activityName" label="活动名称" placeholder="请输入活动名称 " size="large" />
      <van-field
        readonly
        clickable
        label="活动日期"
        :value="activityDate"
        placeholder="请选择活动日期"
        @click="showPick(1)"
      />
      <van-field
        readonly
        clickable
        label="活动类型"
        :value="activityType"
        placeholder="请选择"
        @click="showPick(2)"
      />
      <van-field
        readonly
        clickable
        label="活动儿童之家"
        :value="activityHome"
        placeholder="请选择"
        @click="showPick(3)"
      />
    </van-cell-group>
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
import { getChildrenHomeList, addActivity } from "@/api/home";
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
        "家庭教育":1,
        "儿童团辅":2,
        "家庭亲子":3,
        "安全护卫":4,
        "微课":5
      }
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    }
  },
  mounted() {
    this.showOverlay = true;
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
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath
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
      this.activityType = value;
      this.showPicker = false;
    },
    onConfirmDate(value) {
      this.showPicker = false;
      this.activityDate = this.getDate(value);
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}-${month}-${day}`;
    },
    add() {
      this.showOverlay = true;
      // console.log('this.activityTypeIDArray[this.activityType]',this.activityTypeIDArray[this.activityType])
      addActivity(
        this.Token,
        this.activityName,
        this.activityTypeIDArray[this.activityType],
        this.childrenHomeIDListArray[this.activityHome],
        this.activityDate,
        this.$route.query.activityType
      )
        .then(res => {
          console.log("addActivity", res);
          this.$notify({
            type: "success",
            message: res.data.msg,
            duration: 500
          });
          setTimeout(() => {
            this.showOverlay = false;
            this.$router.push({
              name: "offlineActivity"
            });
          }, 1000);
        })
        .catch(err => {
          console.log("addActivity", err);
          this.showOverlay = false;
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