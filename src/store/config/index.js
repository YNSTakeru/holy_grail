const state = {
  order: "viewCount",
  params: {},
  showConfig: false,
  startDate: "2005-4-23",
  startHour: "00",
  startMinutes: "00",
  startSeconds: "00",
  endDate: "2007-12-31",
  endHour: "23",
  endMinutes: "59",
  endSeconds: "59",
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
  setSelectedYear(state, year) {
    state.selectedYear = year;
  },
  setStartDateMutation(state, { date }) {
    state.startDate = date;
  },
  setEndDateMutation(state, { date }) {
    state.endDate = date;
  },
  setStartHourMutation(state, data) {
    state.startHour = data.abbr;
  },
  setStartMinutesMutation(state, data) {
    state.startMinutes = data.abbr;
  },
  setStartSecondsMutation(state, data) {
    state.startSeconds = data.abbr;
  },
  setEndHourMutation(state, data) {
    state.endHour = data.abbr;
  },
  setEndMinutesMutation(state, data) {
    state.endMinutes = data.abbr;
  },
  setEndSecondsMutation(state, data) {
    state.endSeconds = data.abbr;
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
  setSelectedYearAction({ commit }, request) {
    commit("setSelectedYear", request.selectedYear);
  },
  setStartDateAction({ commit }, { date }) {
    commit("setStartDateMutation", { date });
  },
  setStartHourAction({ commit }, data) {
    commit("setStartHourMutation", data);
  },
  setStartMinutesAction({ commit }, data) {
    commit("setStartMinutesMutation", data);
  },
  setStartSecondsAction({ commit }, data) {
    commit("setStartSecondsMutation", data);
  },
  setEndDateAction({ commit }, data) {
    commit("setEndDateMutation", data);
  },
  setEndHourAction({ commit }, data) {
    commit("setEndHourMutation", data);
  },
  setEndMinutesAction({ commit }, data) {
    commit("setEndMinutesMutation", data);
  },
  setEndSecondsAction({ commit }, data) {
    commit("setEndSecondsMutation", data);
  },
};
const getters = {
  params() {
    return state.params;
  },
  showConfig() {
    return state.showConfig;
  },
  startHour: (state) => state.startHour,
  startMinutes: (state) => state.startMinutes,
  startSeconds: (state) => state.startSeconds,
  endDate: (state) => state.endDate,
  endHour: (state) => state.endHour,
  endMinutes: (state) => state.endMinutes,
  endSeconds: (state) => state.endSeconds,
  publishedAfter(state) {
    return `${state.startDate}T${state.startHour}:${state.startMinutes}:${state.startSeconds}Z`;
  },
  publishedBefore(state) {
    return `${state.endDate}T${state.endHour}:${state.endMinutes}:${state.endSeconds}Z`;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
