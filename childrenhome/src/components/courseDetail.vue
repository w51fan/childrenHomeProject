<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
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
        <div class="gap gapfive"></div>
        <div class="introduce">
          <div class="title">专家简介</div>
          <div class="gap gapone"></div>
          <img :src="course.Professor.HeadPortrait" />
          <div class="name">{{course.Professor.Name}}</div>
          <div class="Intro">{{course.Professor.Intro}}</div>
        </div>
      </van-tab>
      <van-tab title="答疑解惑">
        <div class="answerContent">
          <div class="category">志愿者及领队联系方式</div>
          <div class="name">王群英(研究会会长)</div>
          <div class="phone paddingBottomTen">电话:13543280093</div>
          <div class="name">李重(新宁领队)</div>
          <div class="phone">电话:13907393380</div>
          <div class="phone paddingBottomTen">邮箱:562620855@qq.com</div>
          <div class="name">袁孟灿(邵阳县领队)</div>
          <div class="phone">电话:18975989309</div>
          <div class="phone paddingBottomTen">邮箱:445942923@qq.com</div>
          <div class="name">罗少江(武冈、隆回、城步志愿者)</div>
          <div class="phone paddingBottomTen">邮箱:2311711056@qq.com</div>
          <div class="name">蒋邵萍(邵阳、新邵领队)</div>
          <div class="phone paddingBottomTen">邮箱:740003624@qq.com</div>
          <div class="name">徐小芳</div>
          <div class="phone paddingBottomTen">邮箱:635693983@qq.com</div>
          <div class="name">王桂香(邵东领队)</div>
          <div class="phone paddingBottomTen">邮箱:920855660@qq.com</div>
          <div class="name">谢君(邵阳市区、新邵县领队)</div>
          <div class="phone">电话:13607392399</div>
          <div class="phone paddingBottomTen">邮箱:7401103@qq.com</div>
          <div class="name">汤峰(洞口、绥宁领队)</div>
          <div class="phone paddingBottomTen">邮箱:1349401553@qq.com</div>
          <div class="name">赵平凡(邵东领队)</div>
          <div class="phone">电话:13975902528</div>
          <div class="phone paddingBottomTen">邮箱:657970311@qq.com</div>
          <div class="category" style="margin-top:26rpx;">专家联系方式</div>
          <div class="name">陆士桢</div>
          <div class="phone paddingBottomTen">邮箱:952133375@qq.com</div>
          <div class="name">李文道</div>
          <div class="phone paddingBottomTen">邮箱:liwendan@139.com</div>
          <div class="name">孙云晓</div>
          <div class="phone paddingBottomTen">邮箱:syx2008@vip.sina.com</div>
          <div class="name">李庆明</div>
          <div class="phone paddingBottomTen">邮箱:hylqm2003@163.com</div>
          <div class="name">陆小英</div>
          <div class="phone paddingBottomTen">邮箱:rabbit_lu@163.com</div>
        </div>
      </van-tab>
    </van-tabs>
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
  computed: {
    CourseId() {
      return this.$store.state.common.CourseId;
    }
  },
  mounted() {
    getCourseDetail(this.CourseId).then(res => {
      console.log("233", res);
      this.course = res.data.course;
      getLessonList(this.CourseId).then(lesson => {
        console.log("244", lesson);
        this.lessonList = lesson.data.lessonList;
      });
    });
  },
  methods: {
    beginLesson(lesson) {
      console.log("lesson", lesson);
      this.$router.push({
        name: "lessonPage",
        query: {
          CourseId: lesson.CourseId,
          LessonId: lesson.LessonId,
          mp3Url: lesson.Url,
          Name: lesson.Name
        }
      });
    },
    onClickLeft() {
      this.$router.push({
        name: "familyResponsibility"
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
.answerContent {
  text-align: left;
  padding: 20px;
  .category {
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 15px;
  }
  .name {
    color: #929191;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 5px;
  }
  .phone {
    color: #929191;
    font-size: 16px;
    // font-weight: 600;
  }
  .paddingBottomTen {
    padding-bottom: 15px;
  }
}
</style>