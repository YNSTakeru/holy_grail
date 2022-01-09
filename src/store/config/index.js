const state = {
  order: "viewCount",
  params: {},
  showConfig: false,
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
};
const getters = {
  params() {
    return state.params;
  },
  showConfig() {
    return state.showConfig;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
