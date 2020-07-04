<template>
  <div class="addChildrenPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>儿童信息</div>
    <div>
      姓名
      性别
      头像
      儿童类型
      民族
      身份证号码
      现居地址
      健康状况
      是否寄宿学校
      就学情况
      家庭经济情况
      家庭经济来源状况
      救助帮扶情况
    </div>
    <div>父母信息</div>
    <div>
      父亲姓名
      当前务工地点
      联系方式
      母亲姓名
      当前务工地点
      联系方式
    </div>
    <div>实际监护人信息（必填）</div>
    <div>
      姓名
      手机号
      身份
    </div>
    <div>
      <van-button style="width:100%;" type="warning" @click="save">新建成员</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addChildren",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath
      });
    },
    save(){}
  }
};
</script>

<style lang="less">
.addChildrenPage {
}
</style>