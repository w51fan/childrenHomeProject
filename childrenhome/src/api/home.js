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

//儿童之家排名列表（关爱指数）
export const getTopChildrenHomeList = function (cityId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getTopChildrenHomeList?cityId=${cityId}`,
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

//儿童之家详情
export const getChildrenHomeDetail = function (villageId) {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/detail?villageId=${villageId}`,
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
//获取城市列表
export const getCityList = function () {
  return axios.request({
    url: `https://api.quanjiaxue.net/childrenhome/getCityList`,
    method: "get"
  });
}

//获取民族列表
export const getNationList = function () {
  return axios.request({
    url: `https://api.quanjiaxue.net/children/getNation`,
    method: "get"
  });
}

//更新用户消息
export const updateUser = function ({token, name, profilePhoto}) {
  const data = {
    token,
    name,
    profilePhoto,
  }
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/updateUser?token=${data.token}&name=${data.name}&profilePhoto=${data.profilePhoto}`,
    method: "get"
  });
}

//上传图片
export const uploadImg = function (file) {
  return axios.request({
    url: `https://api.quanjiaxue.net/manage/uploadImg`,
    data:file,
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//添加活动
export const addActivity = function (token,name,type,childrenHomeId,date) {
  return axios.request({
    url: `https://api.quanjiaxue.net/activity/add?token=${token}&name=${name}&type=${type}&childrenHomeId=${childrenHomeId}&date=${date}`,
    method: "get"
  });
}

//添加儿童
// token,
// childrenHomeId,
// name,
// sex,
// photo, //非必填
// childrenType, //非必填
// nation, //非必填
// idNumber,
// childrenAddress, //非必填
// health, //非必填
// shcoolLodging, //非必填
// schoolInfo, //非必填
// economicSituation, //非必填
// economicResource, //非必填
// rescueSituation, //非必填
// fatherName, //非必填
// fatherWorkAddress, //非必填
// fatherPhone, //非必填
// motherName, //非必填
// motherWorkAddress, //非必填
// motherPhone, //非必填
// guardianName,
// guardianPhone,
// relation
export const addChildren = function (data) {
  
  return axios.request({
    // url: `https://api.quanjiaxue.net/children/add?token=${data.token}&childrenHomeId=${data.childrenHomeId}&name=${data.name}&sex=${data.sex}&name=${data.date}&idNumber=${data.idNumber}$guardianName=&{dataguardianName}&guardianPhone=${data.guardianPhone}&relation=${data.relation}`,
    url: `https://api.quanjiaxue.net/children/add`,
    data: data,
    method: "post"
  });
}


//删除儿童
export const deleteChildren = function (token, id) {
  return axios.request({
    url: `https://api.quanjiaxue.net/children/delete?token=${token}&id=${id}`,
    method: "get"
  });
}