// initial state
const state = {
    cityId: "",
    CourseId:''
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}