import axios from 'axios';

//新闻咨询列表
export const getList = function(cityId,type){

    return axios.request({
        url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${type}`,
        method: "get"
      });
}


//新闻咨询详情
export const getNewsDetail = function(Id){

  return axios.request({
      url: `https://api.quanjiaxue.net/news/detail?Id=${Id}`,
      method: "get"
    });
}