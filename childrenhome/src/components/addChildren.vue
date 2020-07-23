<template>
  <div class="addChildrenPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="gap gaptwenty"></div>
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
          :error-message="childrenNameErrText"
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
          :error-message="childrenGenderErrText"
        />
        <van-cell title="头像" input-align="right" readonly>
          <template slot="default">
            <!-- <img class="head" src="../assets/nohead.png" alt /> -->
            <van-uploader
              :after-read="afterRead"
              :max-size="2 * 1024 * 1024"
              @oversize="onOversize"
            >
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
          :error-message="childrenIdErrText"
        />
        <van-field
          v-model="childrenAddress"
          label="现居地址"
          placeholder="xx市xx县xx镇（区）xx村（必填） "
          size="large"
          input-align="right"
          name="validator"
          required
          :error-message="childrenAddressErrText"
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
          name="validator"
          required
          :error-message="childrenHealthyErrText"
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
      <div class="gap gaptwenty"></div>
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
      <div class="gap gaptwenty"></div>
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
          :error-message="nameOfGuardianErrText"
        />
        <van-field
          v-model="telOfGuardian"
          label="手机号"
          placeholder="监护人手机号 "
          size="large"
          input-align="right"
          name="validator"
          required
          :error-message="telOfGuardianErrText"
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
          :error-message="identityOfGuardianErrText"
        />
      </div>
    </van-form>

    <div style="padding: 30px;">
      <div v-if="showEdit">
        <van-button style="width:100%;" type="warning" @click="save">修改信息</van-button>
      </div>
      <div v-else style="width:100%;">
        <van-button type="primary" style="width:100%;" @click="save">新建成员</van-button>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom" round :style="{ height: '50%' }">
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
        <div style="padding:20px;">家庭经济来源状况（多选）</div>
        <div class="gap gapone"></div>
        <!-- <van-field name="familyFinancialResourcesCheckboxGroup" label="多选" input-align="center" style="padding: 20px;">
          <template #input>
            <van-checkbox-group
              v-model="familyFinancialResourcesCheckboxGroup"
              direction="horizontal"
              class="familyFinancialResources"
              @change="familyFinancialResourcesCheckboxGroupChange"
            >
              <van-checkbox :name="familyFinancialResources" shape="square" v-for="(familyFinancialResources,index) in familyFinancialResourcesList" :key="index">{{familyFinancialResources}}</van-checkbox>
              
            </van-checkbox-group>
          </template>
        </van-field>-->
        <!-- <van-checkbox :name="familyFinancialResources" shape="square" v-for="(familyFinancialResources,index) in familyFinancialResourcesList" :key="index">{{familyFinancialResources}}</van-checkbox> -->
        <van-checkbox-group
          v-model="familyFinancialResourcesCheckboxGroup"
          @change="familyFinancialResourcesCheckboxGroupChange"
        >
          <van-cell
            v-for="(item, index) in familyFinancialResourcesList"
            clickable
            :key="index"
            :title="item"
            @click="toggleFamilyFinancialResources(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxesFamilyFinancialResources" />
            </template>
          </van-cell>
        </van-checkbox-group>

        <div style="padding:5px 20px;">
          <van-button type="default" style="width:80px;height: 32px;" @click="showPicker = false">关闭</van-button>
          <van-button
            type="primary"
            @click="onConfirmFamilyFinancialResources"
            style="width:140px;height: 32px;"
          >确定</van-button>
        </div>
      </div>
      <div v-else-if="currentPick===7">
        <div style="padding:20px;">救助帮扶情况（多选）</div>
        <div class="gap gapone"></div>
        <!-- <van-field name="assistanceAndAssistanceCheckboxGroup" label="多选" input-align="center" style="padding: 20px;">
          <template #input>
            <van-checkbox-group
              v-model="assistanceAndAssistanceCheckboxGroup"
              direction="horizontal"
              class="familyFinancialResources"
              @change="assistanceAndAssistanceCheckboxGroupChange"
            >
              <van-checkbox name="低保" shape="square">低保</van-checkbox>
              <van-checkbox name="临时救助" shape="square">临时救助</van-checkbox>
              <van-checkbox name="医疗救助" shape="square">医疗救助</van-checkbox>
              <van-checkbox name="住房救助" shape="square">住房救助</van-checkbox>
              <van-checkbox name="其他" shape="square">其他</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>-->
        <!-- <van-checkbox
          :name="assistanceAndAssistance"
          shape="square"
          v-for="(assistanceAndAssistance,index) in assistanceAndAssistanceList"
          :key="index"
        >{{assistanceAndAssistance}}</van-checkbox>-->
        <van-checkbox-group
          v-model="assistanceAndAssistanceCheckboxGroup"
          @change="assistanceAndAssistanceCheckboxGroupChange"
        >
          <van-cell
            v-for="(item, index) in assistanceAndAssistanceList"
            clickable
            :key="index"
            :title="item"
            @click="toggleAssistanceAndAssistance(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxesAssistanceAndAssistance" />
            </template>
          </van-cell>
        </van-checkbox-group>
        <div style="padding:20px;">
          <van-button type="default" style="width:80px;height: 32px;" @click="showPicker = false">关闭</van-button>
          <van-button
            type="primary"
            @click="onConfirmAssistanceAndAssistance"
            style="width:140px;height: 32px;"
          >确定</van-button>
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
  editChildren,
  getNationList,
  uploadImg,
  getChildrenDetail
} from "@/api/home";
export default {
  name: "addChildren",
  data() {
    return {
      // result: [],
      showEdit: false,
      showOverlay: false,
      showPicker: false,
      currentPick: "",
      childrenImg: "", //非必填
      childrenName: "",
      childrenGender: "",
      childrenType: "", //非必填
      childrenNation: "", //非必填
      childrenId: "",
      childrenAddress: "",
      childrenHealthy: "",
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
      familyFinancialResourcesCheckboxGroup: [],
      assistanceAndAssistanceCheckboxGroup: [],
      familyFinancialResourcesArray: [],
      assistanceAndAssistanceArray: [],
      childrenTypeList: ["困境儿童", "留守儿童", "孤儿", "残疾儿童", "其他"], //儿童类型。1. 困境儿童 2. 留守儿童 3.孤儿 4.残疾儿童 5.其他
      childrenNationList: [],
      // childrenNationIDList: [],
      childrenHealthyList: ["健康", "患病", "残疾"],
      isBoardingSchoolList: ["是", "否"], //1是，2否
      familyEconomicSituationList: ["富裕", "一般", "贫困"], //经济状况（富裕，一般，平困）
      identityList: ["父母", "亲属", "指定监护人"], //监护人类型；1. 父母 2. 亲属 3. 指定监护人
      genderList: ["男", "女"], //1男，2女
      familyFinancialResourcesList: [
        "打工收入",
        "种养殖业",
        "政府救助",
        "亲朋接济",
        "经商",
        "其他"
      ], //
      assistanceAndAssistanceList: [
        "低保",
        "临时救助",
        "医疗救助",
        "住房救助",
        "其他"
      ], //
      childrenNameErrText: "",
      childrenGenderErrText: "",
      childrenIdErrText: "",
      childrenAddressErrText: "",
      childrenHealthyErrText: "",
      nameOfGuardianErrText: "",
      telOfGuardianErrText: "",
      identityOfGuardianErrText: ""
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
  watch: {
    childrenName(vale) {
      if (vale === "") {
        this.childrenNameErrText = "请输入";
      } else {
        this.childrenNameErrText = "";
      }
    },
    childrenGender(vale) {
      if (vale === "") {
        this.childrenGenderErrText = "请选择";
      } else {
        this.childrenGenderErrText = "";
      }
    },
    childrenId(vale) {
      if (vale === "") {
        this.childrenIdErrText = "请输入";
      } else {
        this.childrenIdErrText = "";
      }
    },
    childrenAddress(vale) {
      if (vale === "") {
        this.childrenAddressErrText = "请输入";
      } else {
        this.childrenAddressErrText = "";
      }
    },
    childrenHealthy(vale) {
      if (vale === "") {
        this.childrenHealthyErrText = "请选择";
      } else {
        this.childrenHealthyErrText = "";
      }
    },
    nameOfGuardian(vale) {
      if (vale === "") {
        this.nameOfGuardianErrText = "请输入";
      } else {
        this.nameOfGuardianErrText = "";
      }
    },
    telOfGuardian(vale) {
      if (vale === "") {
        this.telOfGuardianErrText = "请输入";
      } else {
        this.telOfGuardianErrText = "";
      }
    },
    identityOfGuardian(vale) {
      if (vale === "") {
        this.identityOfGuardianErrText = "请选择";
      } else {
        this.identityOfGuardianErrText = "";
      }
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
          this.showEdit = true;
          getChildrenDetail(this.$route.query.childrenId).then(result => {
            console.log("getChildrenDetail", result);
            this.childrenName = result.data.children.Name;
            this.childrenGender = this.genderList[result.data.children.Sex - 1];
            this.childrenImg = result.data.children.Photo;
            this.childrenType = this.childrenTypeList[
              result.data.children.ChildrenType - 1
            ];
            this.childrenNation = result.data.children.Nation;
            this.childrenId = result.data.children.Id;
            this.childrenAddress = result.data.children.ChildrenAddress;
            this.childrenHealthy = result.data.children.Health;
            this.isBoardingSchool = this.isBoardingSchoolList[
              result.data.children.ShcoolLodging - 1
            ];
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
            this.nameOfGuardian = result.data.children.ParentUser.Name;
            this.telOfGuardian = result.data.children.ParentUser.Phone;
            this.identityOfGuardian = this.identityList[
              result.data.children.Relation - 1
            ];
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
    onConfirmChildrenHealthy(value) {
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
      this.familyFinancialResourcesArray = [];
      this.showPicker = false;
    },
    onConfirmAssistanceAndAssistance(value) {
      this.assistanceAndAssistanceArray = [];
      this.showPicker = false;
    },
    onConfirmGenderList(value) {
      this.childrenGender = value;
      this.showPicker = false;
    },
    familyFinancialResourcesCheckboxGroupChange(value) {
      if (this.familyFinancialResourcesArray.length > 0) {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (!this.familyFinancialResourcesArray.includes(element))
              this.familyFinancialResourcesArray.push(element);
          }
        }
      } else {
        this.familyFinancialResourcesArray = value;
      }
      this.familyFinancialResources = "";
      for (const key in this.familyFinancialResourcesArray) {
        if (this.familyFinancialResourcesArray.hasOwnProperty(key)) {
          const element = this.familyFinancialResourcesArray[key];
          this.familyFinancialResources =
            this.familyFinancialResources === ""
              ? element
              : `${this.familyFinancialResources}，${element}`;
        }
      }
    },
    assistanceAndAssistanceCheckboxGroupChange(value) {
      if (this.assistanceAndAssistanceArray.length > 0) {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (!this.assistanceAndAssistanceArray.includes(element))
              this.assistanceAndAssistanceArray.push(element);
          }
        }
      } else {
        this.assistanceAndAssistanceArray = value;
      }
      this.assistanceAndAssistance = "";
      for (const key in this.assistanceAndAssistanceArray) {
        if (this.assistanceAndAssistanceArray.hasOwnProperty(key)) {
          const element = this.assistanceAndAssistanceArray[key];
          this.assistanceAndAssistance =
            this.assistanceAndAssistance === ""
              ? element
              : `${this.assistanceAndAssistance}，${element}`;
        }
      }
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
      if (this.childrenName === "") {
        this.childrenNameErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.childrenNameErrText = "";
      }
      if (this.childrenGender === "") {
        this.childrenGenderErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.childrenGenderErrText = "";
      }
      if (this.childrenId === "") {
        this.childrenIdErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.childrenIdErrText = "";
      }
      if (this.childrenAddress === "") {
        this.childrenAddressErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.childrenAddressErrText = "";
      }
      if (this.childrenHealthy === "") {
        this.childrenHealthyErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.childrenHealthyErrText = "";
      }
      if (this.nameOfGuardian === "") {
        this.nameOfGuardianErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.nameOfGuardianErrText = "";
      }
      if (this.telOfGuardian === "") {
        this.telOfGuardianErrText = "请输入";
        this.showOverlay = false;
        return;
      } else {
        this.telOfGuardianErrText = "";
      }
      if (this.identityOfGuardian === "") {
        this.identityOfGuardianErrText = "请选择";
        this.showOverlay = false;
        return;
      } else {
        this.identityOfGuardianErrText = "";
      }
      if (this.$route.query.childrenId) {
        editChildren({
          token: this.Token,
          childrenHomeId: this.ChildrenHomeId,
          name: this.childrenName,
          sex: this.childrenGender === "男" ? 1 : 2,
          photo: this.childrenImg,
          childrenType:
            this.childrenType === "困境儿童"
              ? 1
              : this.childrenType === "留守儿童"
              ? 2
              : this.childrenType === "孤儿"
              ? 3
              : this.childrenType === "残疾儿童"
              ? 4
              : 5,
          nation: this.childrenNation,
          idNumber: this.childrenId,
          childrenAddress: this.childrenAddress,
          health: this.childrenHealthy,
          shcoolLodging: this.isBoardingSchool === "是" ? 1 : 2,
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
          relation:
            this.identityOfGuardian === "父母"
              ? 1
              : this.identityOfGuardian === "亲属"
              ? 2
              : 3
        })
          .then(res => {
            console.log("editChildren", res);
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
                  name: "assistantChildrenHomeDetail",
                  query: {
                    currentPath: "childrenHomePage"
                  }
                });
              }, 1000);
            }
          })
          .catch(err => {
            console.log("addChildren", err);
            $this.showOverlay = false;
          });
      } else {
        addChildren({
          token: this.Token,
          childrenHomeId: this.ChildrenHomeId,
          name: this.childrenName,
          sex: this.childrenGender === "男" ? 1 : 2,
          photo: this.childrenImg,
          childrenType:
            this.childrenType === "困境儿童"
              ? 1
              : this.childrenType === "留守儿童"
              ? 2
              : this.childrenType === "孤儿"
              ? 3
              : this.childrenType === "残疾儿童"
              ? 4
              : 5,
          nation: this.childrenNation,
          idNumber: this.childrenId,
          childrenAddress: this.childrenAddress,
          health: this.childrenHealthy,
          shcoolLodging: this.isBoardingSchool === "是" ? 1 : 2,
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
          relation:
            this.identityOfGuardian === "父母"
              ? 1
              : this.identityOfGuardian === "亲属"
              ? 2
              : 3
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
                  name: "assistantChildrenHomeDetail",
                  query: {
                    currentPath: "childrenHomePage"
                  }
                });
              }, 1000);
            }
          })
          .catch(err => {
            console.log("addChildren", err);
            $this.showOverlay = false;
          });
      }

      this.showOverlay = false;
    },
    onOversize(file) {
      // console.log('onOversize',file);
      this.$notify({
        type: "warning",
        message: "图片大小不能超过2M",
        duration: 1500
      });
    },
    toggleFamilyFinancialResources(index) {
      this.$refs.checkboxesFamilyFinancialResources[index].toggle();
    },
    toggleAssistanceAndAssistance(index) {
      this.$refs.checkboxesAssistanceAndAssistance[index].toggle();
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
    height: 1px;
  }
  .gaptwenty {
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
  .familyFinancialResources {
    text-align: left;
    width: 100%;
    display: block;
    // .van-checkbox-group--horizontal {

    // }
  }
}
</style>