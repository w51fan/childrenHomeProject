<template>
  <div class="activityDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="activityDetailTitle">{{activity.Name}}</div>
    <div class="starlist flex">
      <ul class="cleanfloat flex">
        <li v-for="(n,index) in 5" :key="index" :class="[index+1>starNum?'grayStar':'star']">★</li>
      </ul>
      <div class="status will" v-if="activity.Status===1">即将开始</div>
      <div class="status ing" v-else-if="activity.Status===2">进行中...</div>
      <div class="status finished" v-else>已结束</div>
    </div>
    <div class="activityType flex">
      <div>类型：</div>
      <div class="activityTypeContent">{{ActivityType}} （{{getDate(activity.Date)}}创建）</div>
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
          >{{activity.User.Type===4?'村级管理员':activity.User.Type===7?'志愿者':activity.User.Type===3?'镇级管理员':activity.User.Type===2?'县级管理员':activity.User.Type===1?'市级管理员':activity.User.Type===6?'助理':'村级讲师'}}</div>
        </div>
      </div>
      <div class="activityImgTitle">活动图片（{{activityImageList.length}}/6）</div>

      <div class="activityImageList">
        <div class="flex wrap">
          <img
            :src="img.Url"
            v-for="(img,index) in activityImageList"
            :key="index"
            class="imgItem"
            @click="showPreview(index)"
          />
        </div>
        <van-image-preview
          class="imgPreview"
          v-model="showImgPreview"
          :images="imagesArray"
          @change="onImgPreviewChange"
          :startPosition="startPosition"
        >
          <template v-slot:turn>{{ turn }}/{{activityImageList.length}}</template>
        </van-image-preview>
      </div>
      <div class="activityImgTitle">签到图片（{{signInImageList.length}}/1）</div>
      <div class="activityImageList">
        <div class="flex wrap">
          <img
            :src="img.Url"
            v-for="(img,index) in signInImageList"
            :key="index"
            class="imgItem"
            @click="showSignPreview(index)"
          />
        </div>
        <van-image-preview
          class="imgPreview"
          v-model="showSignImgPreview"
          :images="signImagesArray"
          @change="onImgPreviewChange"
          :startPosition="startSignPosition"
        >
          <template v-slot:turn>{{ turn }}/{{signInImageList.length}}</template>
        </van-image-preview>
      </div>
    </div>
    <div>
      <div class="activityRecord">活动记录</div>
      <div class="activityRecordInput" style="padding:20px;" v-if="showSubmitButton">
        <van-field
          v-model="recordContent"
          type="textarea"
          placeholder="请输入活动记录"
          input-align="left"
          maxlength="500"
          autosize
          show-word-limit
        />
        <div style="text-align: right;padding: 20px 20px 0;">
          <van-button type="default" size="small" @click="showSubmitConfirmfun">提交记录</van-button>
        </div>
      </div>
      <div style="background: rgba(128, 128, 128, 0.1);">
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
      </div>
      <div class="gap gaptwenty"></div>
    </div>
    <div>
      <div class="activityEvaluate">活动评价</div>
      <div style="background: rgba(128, 128, 128, 0.1);padding: 20px;color: #9c9c9c;">暂无活动评价</div>
    </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
    <van-dialog
      v-model="showSubmitConfirm"
      :show-cancel-button="true"
      :showConfirmButton="true"
      @confirm="submitRelease"
    >
      <div style="padding:20px;text-align: left;">您是否提交活动记录，提交后如果需要修改，您可以再次提交后替换您之前的活动记录。</div>
    </van-dialog>
  </div>
</template>

<script>
import { getActivityDetail, release, addRecord } from "@/api/home";
export default {
  name: "activityDetail",
  data() {
    return {
      activity: {},
      activityRecordList: [],
      activityImageList: [],
      signInImageList: [],
      showImgPreview: false,
      showSignImgPreview: false,
      imagesArray: [],
      signImagesArray: [],
      turn: 0,
      startPosition: 0,
      startSignPosition:0,
      ActivityType: "",
      starNum: 0,
      recordContent: "",
      ProfilePhoto: require("../assets/nohead.png"),
      showSubmitButton: false,
      showSubmitConfirm: false,
      showOverlay: false
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.showOverlay = true;
      if (this.$route.query.showSubmitButton) this.showSubmitButton = true;
      getActivityDetail(this.$route.query.activityId)
        .then(res => {
          console.log("activity", res);
          this.activity = res.data.activity;
          if (res.data.activity.User.ProfilePhoto !== "")
            this.ProfilePhoto = res.data.activity.User.ProfilePhoto;

          this.starNum = res.data.activity.Score / 10;
          this.activityRecordList = res.data.activityRecordList;
          this.activityImageList = res.data.activityImageList;
          this.signInImageList = res.data.signInImageList;
          this.ActivityType =
            this.activity.ActivityType === 1
              ? "家庭教育"
              : this.activity.ActivityType === 2
              ? "儿童团辅"
              : this.activity.ActivityType === 3
              ? "家庭亲子"
              : "安全护卫";
          this.activityImageList.forEach(item => {
            this.imagesArray.push(item.Url);
          });
          this.signImagesArray.push(this.signInImageList[0].Url);
          // console.log(
          //   "record.Content",
          //   this.activityRecordList[0].Content.indexOf("http") > -1
          // );
          this.showOverlay = false;
        })
        .catch(err => {
          console.log("err", err);
          this.showOverlay = false;
        });
    },
    showPreview(index) {
      this.showImgPreview = true;
      this.startPosition = index;
    },
    showSignPreview(index) {
      this.showSignImgPreview = true;
      this.startSignPosition = index;
    },
    getDate(date) {
      let activityDate = new Date(date);
      let year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      let day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    onImgPreviewChange() {},
    onClickLeft() {
      // console.log('PreCurrentPath',this.PreCurrentPath)
      this.$router.push({
        name: this.$route.query.currentPath
      });
    },
    showSubmitConfirmfun() {
      if (this.recordContent.length < 20) {
        this.$toast("请输入20-500字");
        return;
      }
      this.showSubmitConfirm = true;
    },
    submitRelease() {
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
    }
  }
};
</script>

<style lang="less" >
.activityDetailPage {
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
  .activityRecordUserHead {
    width: 30px;
    text-align: center;
    font-size: 12px;
    padding: 8px;
    background: #3b4c5a;
    border-radius: 50%;
  }
  .activityRecordUserContent {
    background: rgb(255, 255, 255);
    margin: 0px 20px 0 70px;
    padding: 20px;
    text-align: left;
    word-break: break-word;
  }
  .activityEvaluate {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .wrap {
    flex-wrap: wrap;
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
  .activityTypeContent {
    color: #8a8a8a;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: rgba(128, 128, 128, 0.1);
  }

  .gapten {
    height: 10px;
  }
  .gaptwenty {
    height: 20px;
  }
  .activityImageList {
    padding: 0 20px;
    img {
      width: 100%;
      height: 100%;
      min-width: 100px;
      max-width: 100px;
      min-height: 120px;
      max-height: 120px;
    }
    .imgItem {
      flex: 1;
      padding: 10px 5px;
    }
  }
  .imgPreview {
    img {
      width: 100%;
      height: 80%;
      min-width: 100%;
      max-width: 100%;
      min-height: 80%;
      max-height: 80%;
      margin-top: 40px;
    }
  }
  .activityRecordInput {
    .van-cell {
      padding: 0;
    }
    .van-field__body {
      border: 1px solid #efefef;
    }
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