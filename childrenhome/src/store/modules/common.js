// initial state
const state = {
    cityId: "",
    CourseId: '',
    VillageId: '',
    Token: ''
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}