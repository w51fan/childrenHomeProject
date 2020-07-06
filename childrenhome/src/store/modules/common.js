// initial state
const state = {
    cityId: "",
    CourseId: '',
    VillageId: '',
    Token: '',
    UserTpye:'',
    User:'',
    ChildrenHomeId: ''
}

const getters = {}

const actions = {}

const mutations = {
    getCityId(state, value) {
        state.cityId = value;
    },
    getCourseId(state, value) {
        state.CourseId = value;
    },
    getVillageId(state, value) {
        state.VillageId = value;
    },
    getToken(state, value) {
        state.Token = value;
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}