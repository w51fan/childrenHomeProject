import axios from 'axios';

//新闻咨询列表
export const getList = function (cityId, type) {
  return axios.request({
    url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${type}`,
    method: "get"
  });
}


//新闻咨询详情
export const getNewsDetail = function (Id) {
  return axios.request({
    url: `https://api.quanjiaxue.net/news/detail?Id=${Id}`,
    method: "get"
  });
}

//获取活动列表
/* 
type: 1.家庭教育；2.儿童团辅；3.家庭亲子；4.安全护卫
activityType:1.线下活动；2线上活动
*/
export const getActivityList = function ({cityId, areaId, townId, type, activityType}) {
  const data = {cityId, areaId, townId, type, activityType} 
  if (data.type) {
    return axios.request({
      url: `https://api.quanjiaxue.net/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}&type=${data.type}`,
      method: "get"
    });
  }
  else if (data.activityType) {
    return axios.request({
      url: `https://api.quanjiaxue.net/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}&activityType=${data.activityType}`,
      method: "get"
    });
  }else{
    return axios.request({
      url: `https://api.quanjiaxue.net/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}`,
      method: "get"
    });
  }
}


//数据统计总数
export const getTotalCount = function (cityId) {

  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getTotalCount?cityId=${cityId}`,
    method: "get"
  });
}

//数据统计列表树状
export const getTreeCount = function (cityId) {

  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getTreeCount?cityId=${cityId}`,
    method: "get"
  });
}



//活动详情
export const getActivityDetail = function (activityId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/activity/detail?activityId=${activityId}`,
    method: "get"
  });
}


//村列表
export const getVillageList = function (townId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getVillageList?townId=${townId}`,
    method: "get"
  });
}

//乡镇列表
export const getTownList = function (cityId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getTownList?cityId=${cityId}`,
    method: "get"
  });
}

//乡镇列表
export const getChildrenhomeDetail = function (villageId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/detail?villageId=${villageId}`,
    method: "get"
  });
}

//课程列表
export const getCourseList = function () {
  return axios.request({
    url: `https://api.quanjiaxue.net/course/courseList`,
    method: "get"
  });
}

//课程详情
export const getCourseDetail = function (courseId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/course/courseDetail?courseId=${courseId}`,
    method: "get"
  });
}

//课时列表
export const getLessonList = function (courseId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/course/lessonList?courseId=${courseId}`,
    method: "get"
  });
}



//知识点列表
export const getPointList = function (courseId,lessonId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/course/pointList?courseId=${courseId}&lessonId=${lessonId}`,
    method: "get"
  });
}

//课时详情
export const getLessonDetail = function (courseId, lessonId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/course/lessonDetail?courseId=${courseId}&lessonId=${lessonId}`,
    method: "get"
  });
}


//儿童之家列表
export const getChildrenHomeList = function (token) {
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/getChildrenHomeList?token=${token}`,
    method: "get"
  });
}

//成长故事列表
/* 
type: 1.家长说；2.志愿者说；3.美丽心灵
activityType:1.线下活动；2线上活动
*/
export const getArticleList = function (cityId, type) { 
  return axios.request({
    url: `https://api.quanjiaxue.net/article/list?cityId=${cityId}&type=${type}`,
    method: "get"
  });
}


//成长故事详情
export const getArticleDetail = function (Id) {
  return axios.request({
    url: `https://api.quanjiaxue.net/article/detail?Id=${Id}`,
    method: "get"
  });
}

//获取验证码
export const getVerifyCode = function (phone) {
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/getVerifyCode?phone=${phone}`,
    method: "get"
  });
}

//用户登录
export const login = function (phone, code) {
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/login?phone=${phone}&code=${code}`,
    method: "get"
  });
}


//获取登录用户信息
export const getUserInfo = function (token) {
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/getUser?token=${token}`,
  });
}
//切换城市列表
export const getCityList = function (Id) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getCityList`,
    method: "get"
  });
}

