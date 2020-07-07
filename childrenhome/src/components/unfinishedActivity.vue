<template>
  <div class="unfinishedActivityPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- <div class="activityDetailTitle">{{activity.Name}}</div> -->
    <div class="activityDetailTitle">ceshi</div>
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
      <!-- <div class="activityTypeContent">{{ActivityType}} （{{getDate(activity.Date)}}创建）</div> -->
      <div class="activityTypeContent">家庭教育 （2020年7月7日创建）</div>
    </div>
    <div class="gap gapten"></div>
    <div>
      <div class="activityOrganizers">活动组织人员</div>
      <div>
        <div class="activityOrganizersHead">
          <img class="head" :src="ProfilePhoto" alt />
          <!-- <div style="padding-left: 10%;padding-bottom: 10px;">{{activity.User.Name}}</div> -->
          <div style="padding-left: 10%;padding-bottom: 10px;">测试</div>
          <!-- <div
            class="status will"
            style="width: 80px;color: black;margin:0;"
          >{{activity.User.Type===4?'村级管理员':activity.User.Type===7?'志愿者':activity.User.Type===3?'镇级管理员':activity.User.Type===2?'县级管理员':activity.User.Type===1?'市级管理员':activity.User.Type===6?'助理':'村级讲师'}}</div>-->
          <div class="status will" style="width: 80px;color: black;margin:0;">志愿者</div>
        </div>
      </div>
      <!-- <div class="activityImgTitle">活动图片（{{activityImageList.length}}/{{activityImageList.length}}）</div> -->
      <div class="activityImgTitle">活动图片（{{imgFileList.length}}/6）</div>
      <!-- <div class="flex space-between" style="padding: 20px;">
        <div class="activityImgTitle">活动图片（0/6）</div>
        <div style="color:#9c9a9a">点击“+”上传</div>
      </div>-->
      <div style="text-align: left;padding: 0 20px;">
        <van-uploader :after-read="afterRead" v-model="imgFileList" :max-count="6" />
        <!-- <van-uploader>
          <van-button icon="photo" type="primary">上传文件</van-button>
        </van-uploader>-->
      </div>
    </div>
     <div class="activityImgTitle">签到图片（{{signImgFileList.length}}/1）</div>
     <div style="text-align: left;padding: 0 20px;">
        <van-uploader :after-read="afterSignRead" v-model="signImgFileList" :max-count="1" />
        <!-- <van-uploader>
          <van-button icon="photo" type="primary">上传文件</van-button>
        </van-uploader>-->
      </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { uploadImg } from "@/api/home";
export default {
  name: "unfinishedActivity",
  data() {
    return {
      // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      //   // Uploader 根据文件后缀来判断是否为图片文件
      //   // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      //   { url: 'https://cloud-image', isImage: true },
      imgFileList: [],
      signImgFileList:[],
      starNum: 0,
      showOverlay: false,
      ProfilePhoto: require("../assets/nohead.png"),
      activity: {
        Name: "22",
        Status: 2
      }
    };
  },
  mounted() {},
  methods: {
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
        if (this.imgFileList.length > 0) {
          this.imgFileList[this.imgFileList.length].url = res.data.url;
        } else {
          this.imgFileList[this.imgFileList.length + 1].url = res.data.url;
        }
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
    },
    afterSignRead(file){
      this.showOverlay = true;
      let formData = new window.FormData();
      formData.append("file", file.file);
      uploadImg(formData).then(res => {
        // if (this.signImgFileList.length > 0) {
        //   this.signImgFileList[this.imgFileList.length].url = res.data.url;
        // } else {
        //   this.signImgFileList[this.imgFileList.length + 1].url = res.data.url;
        // }
        console.log('this.imgFileList.length + 1',this.imgFileList.length + 1)
        if(res.data.url)this.signImgFileList[this.imgFileList.length + 1].url = res.data.url;
        
        this.$notify({
          type: "success",
          message: "上传成功",
          duration: 1000
        });
        this.showOverlay = false;
      });
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
    background: rgba(128, 128, 128, 0.1);
  }

  .gapten {
    height: 10px;
  }
}
</style>