<template>
  <div class="addChildrenPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="gap gapone"></div>
    <van-form ref="addChildrenForm" validate-first @failed="onFailed">
      <div class="title">儿童信息</div>
      <div class="addChildrenTable">
        <van-field
          v-model="childrenName"
          label="姓名"
          placeholder="请输入姓名 "
          size="large"
          input-align="right"
          name="validator"
          required
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="childrenGender"
          label="性别"
          placeholder="请选择"
          size="large"
          input-align="right"
          name="validator"
          @click="showPick(8)"
          required
          :rules="[{ required: true, message: '请选择性别' }]"
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
          name="validator"
          required
          :rules="[{ required: true, message: '请输入身份证号码' }]"
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
          name="validator"
          required
          :rules="[{ required: true, message: '请输入监护人姓名' }]"
        />
        <van-field
          v-model="telOfGuardian"
          label="手机号"
          placeholder="监护人手机号 "
          size="large"
          input-align="right"
          name="validator"
          required
          :rules="[{ required: true, message: '请输入监护人手机号' }]"
        />
        <van-field
          readonly
          clickable
          label="身份"
          :value="identityOfGuardian"
          placeholder="请选择"
          size="large"
          @click="showPick(9)"
          input-align="right"
          name="validator"
          required
          :rules="[{ required: true, message: '请选择身份' }]"
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
      <div v-else-if="currentPick===8">
        <van-picker
          show-toolbar
          :columns="genderList"
          @cancel="showPicker = false"
          @confirm="onConfirmGenderList"
        />
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
import {
  addChildren,
  getNationList,
  uploadImg,
  getChildrenDetail
} from "@/api/home";
export default {
  name: "addChildren",
  data() {
    return {
      showOverlay: false,
      showPicker: false,
      currentPick: "",
      childrenImg: "", //非必填
      childrenName: "",
      childrenGender: "",
      childrenType: "", //非必填
      childrenNation: "", //非必填
      childrenId: "",
      childrenAddress: "", //非必填
      childrenHealthy: "", //非必填
      isBoardingSchool: "", //非必填
      childrenClass: "", //非必填
      familyEconomicSituation: "", //非必填
      familyFinancialResources: "", //非必填
      assistanceAndAssistance: "", //非必填
      fatherName: "", //非必填
      fatherWorkPlace: "", //非必填
      fatherTel: "", //非必填
      motherName: "", //非必填
      motherWorkPlace: "", //非必填
      motherTel: "", //非必填
      nameOfGuardian: "",
      telOfGuardian: "",
      identityOfGuardian: "",
      childrenTypeList: ["困境儿童", "留守儿童"],
      childrenNationList: [],
      // childrenNationIDList: [],
      childrenHealthyList: ["健康", "患病", "残疾"],
      isBoardingSchoolList: ["是", "否"],
      familyEconomicSituationList: ["富裕", "一般", "贫困"],
      identityList: ["父母", "亲属", "指定监护人"],
      genderList: ["男", "女"]
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    ChildrenHomeId() {
      return this.$store.state.common.ChildrenHomeId;
    }
  },
  mounted() {
    this.showOverlay = true;
    getNationList()
      .then(res => {
        console.log("getNationList", res);
        res.data.nationList.forEach(element => {
          this.childrenNationList.push(element.Name);
          // this.childrenNationIDList[element.Name] = element.Id;
        });
        if (this.$route.query.childrenId) {
          getChildrenDetail(this.$route.query.childrenId).then(result => {
            console.log("getChildrenDetail", result);
            this.childrenName = result.data.children.Name;
            this.childrenGender = result.data.children.Sex;
            this.childrenImg = result.data.children.Photo;
            this.childrenType = result.data.children.ChildrenType;
            this.childrenNation = result.data.children.Nation;
            this.childrenId = result.data.children.IdNumber;
            this.childrenAddress = result.data.children.ChildrenAddress;
            this.childrenHealthy = result.data.children.Health;
            this.isBoardingSchool = result.data.children.ShcoolLodging;
            this.childrenClass = result.data.children.SchoolInfo;
            this.familyEconomicSituation =
              result.data.children.EconomicSituation;
            this.familyFinancialResources =
              result.data.children.EconomicResource;
            this.assistanceAndAssistance = result.data.children.RescueSituation;
            this.fatherName = result.data.children.FatherName;
            this.fatherWorkPlace = result.data.children.FatherWorkAddress;
            this.fatherTel = result.data.children.FatherPhone;
            this.motherName = result.data.children.MotherName;
            this.motherWorkPlace = result.data.children.MotherWorkAddress;
            this.motherTel = result.data.children.MotherPhone;
            // guardianName: this.nameOfGuardian=result.data.children.
            // guardianPhone: this.telOfGuardian=result.data.children.
            this.identityOfGuardian = result.data.children.Relation;
            this.showOverlay = false;
          });
        }
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("getNationList", err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "assistantChildrenHomeDetail"
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
    onConfirmchildrenNationList(value) {
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
      this.identityOfGuardian = value;
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
    onConfirmGenderList(value) {
      this.childrenGender = value;
      this.showPicker = false;
    },
    afterRead(file) {
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        this.childrenImg = res.data.url;
        console.log("uploadImg", res);
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    save() {
      this.showOverlay = true;
      let $this = this;
      // console.log(
      //   'this.$refs["addChildrenForm"]',
      //   this.$refs["addChildrenForm"]
      // );
      this.$refs["addChildrenForm"]
        .validateAll()
        .then(() => {
          addChildren({
            token: this.Token,
            childrenHomeId: this.ChildrenHomeId,
            name: this.childrenName,
            sex: this.childrenGender,
            photo: this.childrenImg,
            childrenType: this.childrenType,
            nation: this.childrenNation,
            idNumber: this.childrenId,
            childrenAddress: this.childrenAddress,
            health: this.childrenHealthy,
            shcoolLodging: this.isBoardingSchool,
            schoolInfo: this.childrenClass,
            economicSituation: this.familyEconomicSituation,
            economicResource: this.familyFinancialResources,
            rescueSituation: this.assistanceAndAssistance,
            fatherName: this.fatherName,
            fatherWorkAddress: this.fatherWorkPlace,
            fatherPhone: this.fatherTel,
            motherName: this.motherName,
            motherWorkAddress: this.motherWorkPlace,
            motherPhone: this.motherTel,
            guardianName: this.nameOfGuardian,
            guardianPhone: this.telOfGuardian,
            relation: this.identityOfGuardian
          })
            .then(res => {
              console.log("addChildren", res);
              $this.showOverlay = false;
              if (res.data.code > 1) {
                this.$notify({
                  type: "warning",
                  message: res.data.error,
                  duration: 500
                });
              } else {
                this.$notify({
                  type: "success",
                  message: res.data.msg,
                  duration: 500
                });
                setTimeout(() => {
                  this.showOverlay = false;
                  this.$router.push({
                    name: "childrenHomeDetail"
                  });
                }, 1000);
              }
            })
            .catch(err => {
              console.log("addChildren", err);
              $this.showOverlay = false;
            });
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    }
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
    .van-field__error-message {
      text-align: right;
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