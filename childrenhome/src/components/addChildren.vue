<template>
  <div class="addChildrenPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="gap gapone"></div>
    <van-form>
      <div class="title">儿童信息</div>
      <div class="addChildrenTable">
        <van-field
          v-model="childrenName"
          label="姓名"
          placeholder="请输入姓名 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="childrenGender"
          label="性别"
          placeholder="请输入性别 "
          size="large"
          input-align="right"
        />
        <van-cell title="头像" input-align="right" readonly>
          <template slot="default">
            <!-- <img class="head" src="../assets/nohead.png" alt /> -->
            <van-uploader :after-read="afterRead">
              <div class="flex">
                <img class="head" :src="childrenImg" alt />
                <div class="arrow">
                  <van-icon name="arrow" />
                </div>
              </div>
            </van-uploader>
          </template>
        </van-cell>
        <van-field
          readonly
          clickable
          label="儿童类型"
          :value="childrenType"
          placeholder="请选择"
          size="large"
          @click="showPick(1)"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="民族"
          :value="childrenNation"
          placeholder="请选择"
          size="large"
          @click="showPick(2)"
          input-align="right"
        />
        <van-field
          v-model="childrenId"
          label="身份证号码"
          placeholder="请输入身份证号码 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="childrenAddress"
          label="现居地址"
          placeholder="xx市xx县xx镇（区）xx村（必填） "
          size="large"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="健康状况"
          :value="childrenHealthy"
          placeholder="请选择"
          size="large"
          @click="showPick(3)"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="是否寄宿学校"
          :value="isBoardingSchool"
          placeholder="请选择"
          size="large"
          @click="showPick(4)"
          input-align="right"
        />
        <van-field
          v-model="childrenClass"
          label="就学情况"
          placeholder="学习班级 "
          size="large"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="家庭经济情况"
          :value="familyEconomicSituation"
          size="large"
          placeholder="请选择"
          @click="showPick(5)"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="家庭经济来源状况"
          :value="familyFinancialResources"
          placeholder="请选择"
          size="large"
          @click="showPick(6)"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="救助帮扶情况"
          :value="assistanceAndAssistance"
          placeholder="请选择"
          size="large"
          @click="showPick(7)"
          input-align="right"
        />
      </div>
      <div class="gap gapone"></div>
      <div class="title">父母信息</div>
      <div class="addChildrenTable">
        <van-field
          v-model="fatherName"
          label="父亲姓名"
          placeholder="父亲姓名 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="fatherWorkPlace"
          label="当前务工地点"
          placeholder="当前务工地点 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="fatherTel"
          label="联系方式"
          placeholder="联系方式 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="motherName"
          label="母亲姓名"
          placeholder="母亲姓名 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="motherWorkPlace"
          label="当前务工地点"
          placeholder="当前务工地点 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="motherTel"
          label="联系方式"
          placeholder="联系方式 "
          size="large"
          input-align="right"
        />
      </div>
      <div class="gap gapone"></div>
      <div class="title">实际监护人信息（必填）</div>
      <div class="addChildrenTable">
        <van-field
          v-model="nameOfGuardian"
          label="姓名"
          placeholder="监护人姓名 "
          size="large"
          input-align="right"
        />
        <van-field
          v-model="telOfGuardian"
          label="手机号"
          placeholder="监护人手机号 "
          size="large"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          label="身份"
          :value="identity"
          placeholder="请选择"
          size="large"
          @click="showPick(8)"
          input-align="right"
        />
      </div>
    </van-form>

    <div style="padding: 30px;">
      <van-button style="width:100%;" type="warning" @click="save">新建成员</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom" :style="{ height: '50%' }">
      <div v-if="currentPick===1">
        <van-picker
          show-toolbar
          :columns="childrenTypeList"
          @cancel="showPicker = false"
          @confirm="onConfirmChildrenTypeList"
        />
      </div>
      <div v-else-if="currentPick===2">
        <van-picker
          show-toolbar
          :columns="childrenNationList"
          @cancel="showPicker = false"
          @confirm="onConfirmchildrenNationList"
        />
      </div>
      <div v-else-if="currentPick===3">
        <van-picker
          show-toolbar
          :columns="childrenHealthyList"
          @cancel="showPicker = false"
          @confirm="onConfirmChildrenHealthy"
        />
      </div>
      <div v-else-if="currentPick===4">
        <van-picker
          show-toolbar
          :columns="isBoardingSchoolList"
          @cancel="showPicker = false"
          @confirm="onConfirmIsBoardingSchoolList"
        />
      </div>
      <div v-else-if="currentPick===5">
        <van-picker
          show-toolbar
          :columns="familyEconomicSituationList"
          @cancel="showPicker = false"
          @confirm="onConfirmFamilyEconomicSituation"
        />
      </div>
      <div v-else-if="currentPick===6">
        <div>家庭经济来源状况</div>
        <van-checkbox v-model="checked" shape="square">打工收入</van-checkbox>
        <van-checkbox v-model="checked" shape="square">种养殖业</van-checkbox>
        <van-checkbox v-model="checked" shape="square">政府救助</van-checkbox>
        <van-checkbox v-model="checked" shape="square">亲朋接济</van-checkbox>
        <van-checkbox v-model="checked" shape="square">经商</van-checkbox>
        <van-checkbox v-model="checked" shape="square">其他</van-checkbox>
        <div>
          <van-button type="default">关闭</van-button>
          <van-button type="primary" @click="onConfirmFamilyFinancialResources">确定</van-button>
        </div>
      </div>
      <div v-else-if="currentPick===7">
        <div>救助帮扶情况</div>
        <van-checkbox v-model="checked" shape="square">低保</van-checkbox>
        <van-checkbox v-model="checked" shape="square">临时救助</van-checkbox>
        <van-checkbox v-model="checked" shape="square">医疗救助</van-checkbox>
        <van-checkbox v-model="checked" shape="square">住房救助</van-checkbox>
        <van-checkbox v-model="checked" shape="square">其他</van-checkbox>
        <div>
          <van-button type="default">关闭</van-button>
          <van-button type="primary" @click="onConfirmAssistanceAndAssistance">确定</van-button>
        </div>
      </div>
      <div v-else>
        <van-picker
          show-toolbar
          :columns="identityList"
          @cancel="showPicker = false"
          @confirm="onConfirmIdentity"
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
export default {
  name: "addChildren",
  data() {
    return {
      showOverlay: false,
      showPicker: false,
      childrenImg: "",
      childrenName: "",
      childrenGender: "",
      childrenType: "",
      childrenNation: "",
      childrenId: "",
      childrenAddress: "",
      childrenHealthy: "",
      isBoardingSchool: "",
      childrenClass: "",
      familyEconomicSituation: "",
      familyFinancialResources: "",
      assistanceAndAssistance: "",
      fatherName: "",
      fatherWorkPlace: "",
      fatherTel: "",
      motherName: "",
      motherWorkPlace: "",
      motherTel: "",
      nameOfGuardian: "",
      telOfGuardian: "",
      identity: "",
      childrenTypeList: ["困境儿童", "留守儿童"],
      childrenNationList: [],
      childrenHealthyList: ["健康", "患病", "残疾"],
      isBoardingSchoolList: ["是", "否"],
      familyEconomicSituationList: ["富裕", "一般", "贫困"],
      identityList: ["父母", "亲属", "指定监护人"]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'childrenHomeDetail'
      });
    },
    showPick(index) {
      this.currentPick = index;
      this.showPicker = true;
    },
    onConfirmChildrenTypeList(value) {
      this.childrenType = value;
      this.showPicker = false;
    },
    onConfirmChildrenHealthy(value) {
      this.childrenNation = value;
      this.showPicker = false;
    },
    onConfirmchildrenHealthy(value) {
      this.childrenHealthy = value;
      this.showPicker = false;
    },
    onConfirmIsBoardingSchoolList(value) {
      this.isBoardingSchool = value;
      this.showPicker = false;
    },
    onConfirmFamilyEconomicSituation(value) {
      this.familyEconomicSituation = value;
      this.showPicker = false;
    },
    onConfirmIdentity(value) {
      this.identity = value;
      this.showPicker = false;
    },
    onConfirmFamilyFinancialResources(value) {
      this.familyFinancialResources = value;
      this.showPicker = false;
    },
    onConfirmAssistanceAndAssistance(value) {
      this.assistanceAndAssistance = value;
      this.showPicker = false;
    },
    save() {}
  }
};
</script>

<style lang="less">
.addChildrenPage {
  .title {
    text-align: left;
    padding: 20px 15px;
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .head {
    width: 25px;
    height: 25px;
    border-radius: 50%;
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
    height: 20px;
  }
  .addChildrenTable {
    .van-cell {
      padding: 15px 20px;
    }
    .van-field__label {
      width: 120px;
    }
    .van-cell__title {
      text-align: left;
      font-size: 16px;
      width: 130px;
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
}
</style>