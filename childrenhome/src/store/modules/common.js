// initial state
const state = {
  cityId: "",
  areaId:'',
  townId:'',
  CourseId: '',
  VillageId: '',
  Token: '',
  UserTpye: '',
  User: '',
  ChildrenHomeId: '',
  SocialStationId: '',
  PreCurrentPath: '',
  Select:'',
  activityImageList:[],
  signImgFileList:[],
  activityId:'',
  urls:[]
}

const getters = {
  cityId: (state) => state.currentTab,
  areaId: (state) => state.stuViewLists,
  townId: (state) => state.mediaDevice,
  CourseId: (state) => state.CourseId,
  VillageId: (state) => state.VillageId,
  Token: (state) => state.Token,
  UserTpye: (state) => state.UserTpye,
  User: (state) => state.User,
  ChildrenHomeId: (state) => state.ChildrenHomeId,
  SocialStationId: (state) => state.SocialStationId,
  PreCurrentPath: (state) => state.PreCurrentPath,
  Select: (state) => state.Select,
  activityImageList: (state) => state.  activityImageList,
  signImgFileList: (state) => state.signImgFileList,
}


const actions = {}

const mutations = {
  getCityId(state, value) {
    state.cityId = value;
  },
  getAreaId(state, value) {
    state.areaId = value;
  },
  getTownId(state, value) {
    state.townId = value;
  },
  getCourseId(state, value) {
    state.CourseId = value;
  },
  getVillageId(state, value) {
    state.VillageId = value;
  },
  getToken(state, value) {
    state.Token = value;
    // window.localStorage.setItem('Token',value)
  },
  getUserTpye(state, value) {
    state.UserTpye = value;
  },
  getUser(state, value) {
    state.User = value;
  },
  getChildrenHomeId(state, value) {
    state.ChildrenHomeId = value;
  },
  getSocialStationId(state, value) {
    state.SocialStationId = value;
  },
  getPreCurrentPath(state, value) {
    state.PreCurrentPath = value;
  },
  SET_TOKEN(state, value) {
    state.Token = value;
    window.localStorage.setItem('Token',value)
  },
  getSelect(state, value) {
    state.Select = value;
  },
  getActivityImageList(state, value) {
    state.activityImageList = value;
  },
  getSignImgFileList(state, value) {
    state.signImgFileList = value;
  },
  getActivityId(state, value) {
    state.activityId = value;
  }, 
  getUrls(state, value) {
    state.urls = value;
  },
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}