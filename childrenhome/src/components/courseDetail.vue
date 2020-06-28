<template>
  <div>
    <div style="position: relative;">
      <img :src="course.Professor.ImagePhoto" style="height:250px;" />
      <div class="courseTip">
        <div>{{course.Professor.Name}} 教授</div>
        <div>专题： 《{{course.CourseName}}》</div>
        <div>课程： {{course.LessonNum}}课时</div>
      </div>
    </div>
    <div class="description">
      <div class="title">专题简介</div>
      <div class="text">{{course.Description}}</div>
    </div>
    <div class="gap gapfive"></div>
    <van-tabs class="courseTabs" v-model="activeTab">
      <van-tab title="课时列表">
        <div class="timeContentTitle">课时列表</div>
        <div class="gap gapone"></div>
        <div class="lessonList">
          <div v-for="(lesson,index) in lessonList" :key="index" @click="beginLesson(lesson)">
            <div class="flex lessonItem">
              <van-icon name="play-circle" />
              <div class="lessonName">{{lesson.Name}}</div>
            </div>
            <div class="gap gapone"></div>
          </div>
        </div>
      </van-tab>
      <van-tab title="答疑解惑">
        <div></div>
      </van-tab>
    </van-tabs>
    <div class="gap gapfive"></div>
    <div class="introduce">
      <div class="title">专家简介</div>
      <div class="gap gapone"></div>
      <img :src="course.Professor.HeadPortrait" />
      <div class="name">{{course.Professor.Name}}</div>
      <div class="Intro">{{course.Professor.Intro}}</div>
    </div>
  </div>
</template>

<script>
import { getCourseDetail, getLessonList } from "@/api/home";
export default {
  name: "courseDetail",
  data() {
    return {
      course: "",
      activeTab: "",
      lessonList: ""
    };
  },
  mounted() {
    getCourseDetail(this.$route.query.Id).then(res => {
      console.log("233", res);
      this.course = res.data.course;
      getLessonList(this.$route.query.Id).then(lesson => {
        console.log("244", lesson);
        this.lessonList = lesson.data.lessonList;
      });
    });
  },
  methods: {
    beginLesson(lesson) {
      this.$router.push({
        name: "lessonPage",
        query: {
          CourseId: lesson.CourseId,
          lessonId: lesson.LessonId,
          mp3Url: lesson.Url,
          Name: lesson.Name
        }
      });
    }
  }
};
</script>

<style lang="less">
.flex {
  display: flex;
}
.courseTip {
  text-align: left;
  position: absolute;
  color: #c7c0c0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
}
.description {
  text-align: left;
  padding: 10px 20px;
  .title {
    color: #8a8787;
    font-size: 20px;
    font-weight: bolder;
  }
  .text {
    font-size: 18px;
  }
}
.gap {
  width: 100%;
  height: 8px;
  background: #e6e6e6;
}
.gapfive {
  height: 10px;
}
.gapone {
  height: 1px;
}
.timeContentTitle {
  text-align: left;
  padding: 20px 20px 10px;
}
.courseTabs {
  /deep/.van-tabs__line {
    width: 50% !important;
  }
}
.lessonList {
  text-align: left;
  .lessonName {
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lessonItem {
    padding: 25px 20px;
  }
}
.introduce {
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: left;
    padding: 20px;
  }
  img {
    height: 80px;
    padding: 15px 0 0;
  }
  .name {
    color: #909090;
    font-size: 18px;
  }
  .Intro {
    text-align: left;
    padding: 20px;
  }
}
</style>