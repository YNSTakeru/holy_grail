const state = {
  order: "viewCount",
  params: {},
  showConfig: false,
  selectedYear: ""
};
const mutations = {
  setOrder(state, order) {
    state.order = order;
  },
  setParams(state, params) {
    state.params = params;
  },
  changeShowConfig(state) {
    state.showConfig = !state.showConfig;
  },
  setSelectedYear(state,year){
    state.selectedYear = year
  }
};
const actions = {
  setOrderAction({ commit }, order) {
    commit("setOrder", order);
  },
  setParamsAction({ commit }, request) {
    commit("setParams", request.params);
  },
  changeShowConfigAction({ commit }) {
    commit("changeShowConfig");
  },
  setSelectedYearAction({commit},request){
    commit("setSelectedYear",request.selectedYear)
  }
};
const getters = {
  params() {
    return state.params;
  },
  showConfig() {
    return state.showConfig;
  },
  setSelectedYear(){
    return 
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
