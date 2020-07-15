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
  Select:''
}

const getters = {}

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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}