<template>
  <div class="addLowIncomePersonPage">
    <div class="title">基本信息</div>
    <van-cell-group class="addLowIncomePersonInputTable">
      <van-field v-model="value" label="户主" placeholder="请输入户主" size="large" />
      <van-field v-model="value" label="性别" placeholder="请输入性别" size="large" />
      <van-field v-model="value" label="身份证号" placeholder="请输入身份证号" size="large" />
      <van-field v-model="value" label="住址 " placeholder="请输入住址" size="large" />
      <van-field v-model="value" label="低保类型 " placeholder="请输入低保类型" size="large" />
      <van-field v-model="value" label="家庭月中收入 " placeholder="请输入家庭月中收入" size="large" />
      <van-field v-model="value" label="联系方式 " placeholder="请输入联系方式" size="large" />
      <!-- <van-field v-model="value" label="保障起始年月 " placeholder="请输入保障起始年月" size="large" /> -->
      <van-cell title="保障起始年月" is-link value="请选择保障起始年月" class="pick">
        <template #default>
          <div @click="showPick">保障起始年月</div>
        </template>
      </van-cell>
      <van-field
        v-model="value"
        type="textarea"
        rows="3"
        label="申请原因 "
        placeholder="请输入申请原因"
        size="large"
      />
    </van-cell-group>
    <div style="padding:20px;">
      <van-button type="primary" style="width:100%;">新增</van-button>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "addLowIncomePerson",
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false
    };
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    showPick() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="less">
.addLowIncomePersonPage {
  .title {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .addLowIncomePersonInputTable {
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
        width:120px;
      }
      .van-cell__value{
        text-align: left;
      }
    }
  }
}
</style>