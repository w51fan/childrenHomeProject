<template>
  <div>
    <div>基本信息</div>
    <van-cell-group>
      <van-field v-model="value" label="户主" placeholder="请输入户主" />
      <van-field v-model="value" label="性别" placeholder="请输入性别" />
      <van-field v-model="value" label="身份证号" placeholder="请输入身份证号" />
      <van-field v-model="value" label="住址 " placeholder="请输入住址" />
      <van-field v-model="value" label="低保类型 " placeholder="请输入低保类型" />
      <van-field v-model="value" label="家庭月中收入 " placeholder="请输入家庭月中收入" />
      <van-field v-model="value" label="联系方式 " placeholder="请输入联系方式" />
      <van-field v-model="value" label="保障起始年月 " placeholder="请输入保障起始年月" />
       <van-field v-model="value" type="textarea" label="申请原因 " placeholder="请输入申请原因" />
    </van-cell-group>
    <van-button type="primary" style="width:100%;">新增</van-button>
  </div>
</template>

<script>
export default {
  name: "addLowIncomePerson",
  data() {
    return {};
  }
};
</script>

<style>
</style>