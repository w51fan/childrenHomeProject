<template>
  <div class="lessonPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="lessonVideo">
      <video :src="lesson.Url" autoplay="false" controls></video>
      <div class="topic">主题：{{lesson.Name}}</div>
    </div>
    <div class="flex space-between pointListHead">
      <div class="title">知识点</div>
      <div class="num">{{pointList.length}}个</div>
    </div>
    <div class="gap gapone"></div>
    <div class="pointList">
      <div v-for="(point,index) in pointList" :key="index">
        <div class="pointItemContent">{{point.Collectcnt}}</div>
        <div class="gap gapone"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPointList, getLessonDetail } from "@/api/home";
export default {
  name: "lessonPage",
  data() {
    return {
      lesson: "",
      pointList: ""
    };
  },
  mounted() {
    getLessonDetail(
      this.$route.query.CourseId,
      this.$route.query.LessonId
    ).then(res => {
      console.log("res", res);
      this.lesson = res.data.lesson;
      getPointList(this.$route.query.CourseId, this.$route.query.LessonId).then(
        result => {
          console.log("result", result);
          this.pointList = result.data.pointList;
        }
      );
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "courseDetail"
      });
    }
  }
};
</script>

<style lang="less">
.lessonPage {
  .lessonVideo {
    video {
      width: 100%;
    }
    .topic {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      padding: 20px;
    }
  }
  .pointListHead {
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
    .num {
      color: gray;
    }
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .pointList {
    text-align: left;
    // padding: 20px;
    .pointItemContent {
      font-size: 16px;
      line-height: 35px;
      padding: 10px 20px;
    }
  }
}
</style>