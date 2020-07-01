<template>
  <div class="familyResponsibilityPage">
    <div class="familyResponsibilityHead">
      <img src="../assets/jiatingjinze.png" alt />
      <div class="text">
        <div>家庭教育系列课程</div>
      </div>
    </div>
    <div style="text-align: left;padding: 20px;font-weight: 600;font-size: 20px;">课程列表</div>
    <div style="margin-bottom: 60px;">
      <div
        v-for="(course,index) in courseList"
        :key="index"
        class="flex"
        style="padding: 10px 20px 20px;"
        @click="courseDetail(course)"
      >
        <img
          :src="course.Professor.HeadPortrait"
          alt
          style="height: 120px;width: 100px;border-radius: 8px;"
        />
        <div style="padding-left: 10px;">
          <div style="font-size: 18px;font-weight: 900;text-align: left;">{{course.Professor.Name}}</div>
          <div
            style="text-align: left;font-size: 16px;font-weight: 600;padding: 5px 0;color: #5f5b5b;"
          >{{course.CourseName}}</div>
          <div style="text-align: left;font-size: 14px;color: #a5a0a0;padding: 5px 0;">点击观看</div>
        </div>
      </div>
    </div>
    <bottomNav :selectedNav.sync="selectedNav"></bottomNav>
  </div>
</template>

<script>
import bottomNav from "./bottomNav";
import { getCourseList } from "@/api/home";
export default {
  name: "familyResponsibility",
  components: {
    bottomNav
  },
  data() {
    return {
      selected: "1",
      selectedNav: "familyResponsibility",
      courseList: []
    };
  },
  mounted() {
    getCourseList().then(res => {
      this.courseList = res.data.courseList;
    });
  },
  methods: {
    courseDetail(course) {
      this.$store.commit("common/getCourseId", course.CourseId);
      this.$router.push({
        name: "courseDetail",
        query: {
          Id: course.CourseId
        }
      });
    }
  }
};
</script>

<style lang="less"  scoped>
.familyResponsibilityPage {
  .flex {
    display: flex;
  }
  .familyResponsibilityHead {
    position: relative;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      bottom: 44%;
      left: 34%;
      color: #fff;
      font-size: 22px;
    }
  }
}
</style>