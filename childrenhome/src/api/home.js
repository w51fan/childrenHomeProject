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
  if (data.activityType) {
    return axios.request({
      url: `https://api.quanjiaxue.net/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}&activityType=${data.activityType}`,
      method: "get"
    });
  }
}
