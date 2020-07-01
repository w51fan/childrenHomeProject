// initial state
const state = {
    cityId: "",
    CourseId:'',
    VillageId:'',
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}