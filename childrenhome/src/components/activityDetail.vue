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
      <div class="activityTypeContent">{{ActivityType}} （{{getDate(this.activity.Date)}}创建）</div>
    </div>
    <div class="gap gapten"></div>
    <div>
      <div class="activityOrganizers">活动组织人员</div>
      <div>
        <div class="activityOrganizersHead">
          <div style="color: #ffb100;">暂无头像</div>
        </div>
        <div class="status will" style="width: 60px;color: black;margin: 0 16px;">志愿者</div>
      </div>
      <div></div>
      <div class="activityImgTitle">活动图片（{{activityImageList.length}}/{{activityImageList.length}}）</div>

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
    </div>
    <div>
      <div class="activityRecord">活动记录</div>
      <div style="background: rgba(128, 128, 128, 0.1);">
        <div v-for="(record,index) in activityRecordList" :key="index">
          <div class="activityRecordUser">
            <!-- <div class="activityRecordUserHead">
              <div style="color: #ffb100;">暂无头像</div>
            </div>-->
            <img src="../assets/nohead.png" alt />
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
      <div class="gap gaptwenty"></div>
    </div>
    <div>
      <div class="activityEvaluate">活动评价</div>
      <div style="background: rgba(128, 128, 128, 0.1);padding: 20px;color: #9c9c9c;">暂无活动评价</div>
    </div>
  </div>
</template>

<script>
import { getActivityDetail } from "@/api/home";
export default {
  name: "activityDetail",
  data() {
    return {
      activity: {},
      activityRecordList: [],
      activityImageList: [],
      showImgPreview: false,
      imagesArray: [],
      turn: 0,
      startPosition: 0,
      ActivityType: "",
      starNum: 0
    };
  },
  mounted() {
    getActivityDetail(this.$route.query.Id).then(res => {
      console.log("activity", res);
      this.activity = res.data.activity;
      this.starNum = res.data.activity.Score / 10;
      this.activityRecordList = res.data.activityRecordList;
      this.activityImageList = res.data.activityImageList;
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
      console.log(
        "record.Content",
        this.activityRecordList[0].Content.indexOf("http") > -1
      );
    });
  },
  methods: {
    showPreview(index) {
      this.showImgPreview = true;
      this.startPosition = index;
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
      this.$router.push({
        name: this.$route.query.currentPath
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
    width: 30px;
    text-align: center;
    font-size: 12px;
    margin: 0 35px 10px;
    padding: 10px;
    background: #3b4c5a;
    border-radius: 50%;
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
}
</style>