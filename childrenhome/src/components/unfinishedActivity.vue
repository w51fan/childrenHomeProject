<template>
  <div class="unfinishedActivityPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="activityDetailTitle">{{activity.Name}}</div>
    <!-- <div class="activityDetailTitle">ceshi</div> -->
    <div class="starlist flex">
      <ul class="cleanfloat flex">
        <li v-for="(n,index) in 5" :key="index" :class="[index+1>starNum?'grayStar':'star']">★</li>
      </ul>
      <div class="status will" v-if="activity.Status===1">即将开始</div>
      <div class="status ing" v-else-if="activity.Status===2">进行中</div>
      <div class="status finished" v-else>已结束</div>
    </div>
    <div class="activityType flex">
      <div>类型：</div>
      <div
        class="activityTypeContent"
      >{{activityTypeIDArray[activity.Type]}} （{{getDate(activity.Date)}}创建）</div>
      <!-- <div class="activityTypeContent">家庭教育 （2020年7月7日创建）</div> -->
    </div>
    <div class="gap gapten"></div>
    <div>
      <div class="activityOrganizers">活动组织人员</div>
      <div>
        <div class="activityOrganizersHead">
          <img class="head" :src="ProfilePhoto" alt />
          <div style="padding-left: 10%;padding-bottom: 10px;">{{activity.User.Name}}</div>
          <div
            class="status will"
            style="width: 80px;color: black;margin:0;"
          >{{UserTpye===4?'村级管理员':UserTpye===7?'志愿者':UserTpye===3?'镇级管理员':UserTpye===2?'县级管理员':UserTpye===1?'市级管理员':UserTpye===6?'助理':UserTpye===11?'家长':UserTpye===12?'社区工作服务管理员':'村级讲师'}}</div>
        </div>
      </div>
      <!-- <div class="activityImgTitle">活动图片（{{activityImageList.length}}/{{activityImageList.length}}）</div> -->
      <div class="activityImgTitle">活动图片（{{imgFileList.length}}/6）</div>
      <!-- <div class="flex space-between" style="padding: 20px;">
        <div class="activityImgTitle">活动图片（0/6）</div>
        <div style="color:#9c9a9a">点击“+”上传</div>
      </div>-->
      <div style="text-align: left;padding: 0 20px;">
        <van-uploader
          :after-read="afterRead"
          :before-delete="beforeDelete"
          v-model="imgFileList"
          :max-count="6"
          :max-size="2 * 1024 * 1024"
          @oversize="onOversize"
          :disabled="disabledBtn"
        />
        <!-- <van-uploader>
          <van-button icon="photo" type="primary">上传文件</van-button>
        </van-uploader>-->
      </div>
    </div>
    <div class="activityImgTitle">签到图片（{{signImgFileList.length}}/1）</div>
    <div style="text-align: left;padding: 0 20px;">
      <van-uploader
        :after-read="afterSignRead"
        :before-delete="beforeSignDelete"
        v-model="signImgFileList"
        :max-count="1"
        :max-size="2 * 1024 * 1024"
        @oversize="onOversize"
        :disabled="disabledBtn"
      />
      <!-- <van-uploader>
          <van-button icon="photo" type="primary">上传文件</van-button>
      </van-uploader>-->
    </div>
    <div>
      <div class="activityRecord">活动记录</div>
      <div class="activityRecordInput" style="padding:20px;">
        <van-field
          v-model="recordContent"
          type="textarea"
          rows="5"
          placeholder="请输入活动记录"
          input-align="left"
          maxlength="500"
          show-word-limit
        />
        <div style="text-align: right;padding: 10px 20px 0;">
          <van-button
            type="default"
            :disabled="disabledBtn"
            size="small"
            @click="showSubmitConfirmfun"
          >提交记录</van-button>
        </div>
      </div>
      <div class="bgColor">
        <div v-if="activityRecordList.length>0">
          <div v-for="(record,index) in activityRecordList" :key="index">
            <div class="activityRecordUser">
              <img :src="ProfilePhoto" style="width: 40px;height: 40px;" />
              <div style="line-height: 46px;padding-left: 10px;">{{record.User.Name}}</div>
            </div>
            <div>
              <div class="activityRecordUserContent">
                <img
                  v-if="record.Content.indexOf('http')> -1"
                  :src="record.Content"
                  style="width:100%"
                />
                <div v-else>{{record.Content}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="noRecords" v-else>
          <div class="text">暂无活动记录</div>
        </div>
        <div class="gap gaptwenty"></div>
      </div>
    </div>
    <div>
      <div class="activityRecord">活动评价</div>
      <div class="noRecords bgColor">
        <div class="text">暂无活动评价</div>
      </div>
    </div>
    <van-button
      type="warning"
      style="width:100%;"
      :disabled="disabledBtn"
      @click="submitRelease"
    >完成并公布此活动</van-button>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
    <van-dialog
      v-model="showSubmitConfirm"
      :show-cancel-button="true"
      :showConfirmButton="true"
      @confirm="submitReleaseRecord"
    >
      <div style="padding:20px;text-align: left;">您是否提交活动记录，提交后如果需要修改，您可以再次提交后替换您之前的活动记录。</div>
    </van-dialog>
  </div>
</template>

<script>
import { uploadImg, release, getActivityDetail, addRecord } from "@/api/home";
export default {
  name: "unfinishedActivity",
  data() {
    return {
      // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      //   // Uploader 根据文件后缀来判断是否为图片文件
      //   // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      //   { url: 'https://cloud-image', isImage: true },
      imgFileList: [],
      // activityImageList: [],
      // signImgFileList: [],
      activityRecordList: [],
      starNum: 0,
      showOverlay: false,
      showSubmitConfirm: false,
      recordContent: "",
      ProfilePhoto: require("../assets/nohead.png"),
      activity: "",
      // urls: [],
      signInImage: "",
      activityTypeIDArray: {
        1: "家庭教育",
        2: "儿童团辅",
        3: "家庭亲子",
        4: "安全护卫",
        5: "微课"
      },
      disabledBtn: false
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    activityImageList: {
      get() {
        return this.$store.state.common.activityImageList;
      },
      set(val) {
        this.$store.commit("common/getActivityImageList", val);
      }
    },
    signImgFileList: {
      get() {
        return this.$store.state.common.signImgFileList;
      },
      set(val) {
        this.$store.commit("common/getSignImgFileList", val);
      }
    },
    urls: {
      get() {
        return this.$store.state.common.urls;
      },
      set(val) {
        this.$store.commit("common/getUrls", val);
      }
    },
    UserTpye() {
      return this.$store.state.common.UserTpye;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.showOverlay = true;
      if (this.UserTpye !== 4 && this.UserTpye !== 12) this.disabledBtn = true;
      if (!this.$route.query.isAssistant) this.disabledBtn = true;
      getActivityDetail(this.$route.query.activityId).then(res => {
        console.log("getActivityDetail", res);
        this.activity = res.data.activity;
        this.activityRecordList = res.data.activityRecordList;
        this.showOverlay = false;
        this.imgFileList = this.activityImageList;
      });
    },
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath
      });
    },
    afterRead(file) {
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        // this.urls =
        //   this.urls === "" ? res.data.url : this.urls + "," + res.data.url;
        this.urls.push(res.data.url);
        this.activityImageList = this.imgFileList;
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
    },
    afterSignRead(file) {
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        this.signInImage = res.data.url;
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}-${month}-${day}`;
    },
    showSubmitConfirmfun() {
      if (this.recordContent.length < 20) {
        this.$toast("请输入20-500字");
        return;
      }
      this.showSubmitConfirm = true;
    },
    submitReleaseRecord() {
      this.showOverlay = true;
      addRecord(this.Token, this.activity.Id, this.recordContent)
        .then(res => {
          console.log("release", res);

          if (res.data.code > 1) {
            this.$notify({
              type: "warning",
              message: res.data.error,
              duration: 2000
            });
            this.showOverlay = false;
          } else {
            this.recordContent = "";
            this.init();
          }
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
    submitRelease() {
      // if (this.urls === "") {
      //   this.$toast("活动图片未上传，请先上传活动图片。");
      //   return;
      // }
      if (this.imgFileList.length < 6) {
        this.$toast("活动图片数量不足，请继续上传。");
        return;
      }
      if (this.signInImage === "") {
        this.$toast("签到图片未上传，请先上传签到图片。");
        return;
      }
      let urls = "";
      this.urls.forEach(element => {
        urls = urls === "" ? element : urls + "," + element;
      });
      this.showOverlay = true;
      release(
        this.Token,
        this.activity.Id,
        this.recordContent,
        urls,
        this.signInImage
      )
        .then(res => {
          console.log("release", res);

          if (res.data.code > 1) {
            this.$notify({
              type: "warning",
              message: res.data.error,
              duration: 2000
            });
            this.showOverlay = false;
          } else {
            this.recordContent = "";
            this.$store.commit("common/getActivityImageList", []);
            this.$store.commit("common/getSignImgFileList", []);
            this.$router.push({
              name: this.$route.query.currentPath
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
    onOversize(file) {
      // console.log('onOversize',file);
      this.$notify({
        type: "warning",
        message: "图片大小不能超过2M",
        duration: 1500
      });
    },
    beforeDelete(file, event) {
      // console.log('file',file,event)
      // console.log(this.urls)
      this.imgFileList.splice(event.index, 1);
      this.urls.splice(event.index, 1);
    },
    beforeSignDelete(file, event) {
      // console.log('file',file,this.signInImage)
      this.signImgFileList = [];
      this.signInImage = "";
    }
  }
};
</script>

<style lang="less">
.unfinishedActivityPage {
  .activityDetailTitle {
    text-align: left;
    padding: 10px 20px 0;
    font-size: 16px;
  }
  .activityOrganizers {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .activityOrganizersHead {
    text-align: left;
    font-size: 12px;
    margin: 0 20px 10px;
    .head {
      width: 50px;
      height: 50px;
      padding-left: 7%;
    }
  }
  .activityImgTitle {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .activityRecord {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .activityRecordUser {
    text-align: left;
    padding: 20px;
    display: flex;
  }
  .activityRecordUserContent {
    background: rgb(255, 255, 255);
    margin: 0px 20px 0 70px;
    padding: 20px;
    text-align: left;
    word-break: break-word;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .starlist {
    padding: 10px 20px;
  }
  .grayStar {
    color: #e0e0e0;
    line-height: 30px;
  }
  .star {
    // color: #e0e0e0;
    color: #fbb32f;
    line-height: 30px;
  }
  .status {
    margin: 0 15px;
    padding: 0 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
  }
  .will {
    background: #ffac0ed6;
    color: #6f6f6f;
  }
  .ing {
    background: #10559e;
    color: #fff;
  }
  .finished {
    background: #e8e8e8;
    color: #7d7d7d;
  }
  .activityType {
    padding: 0 20px 10px;
    font-size: 14px;
  }
  .gap {
    width: 100%;
    height: 8px;
    // background: rgba(128, 128, 128, 0.1);
  }

  .gapten {
    height: 10px;
  }
  .gaptwenty {
    height: 20px;
  }
  .activityRecordInput {
    .van-cell {
      padding: 0;
    }
    .van-field__body {
      border: 1px solid #efefef;
    }
  }
  .bgColor {
    background: rgba(128, 128, 128, 0.1);
  }
  .noRecords {
    height: 80px;
    .text {
      padding-top: 30px;
      color: #969696;
    }
  }
}
</style>