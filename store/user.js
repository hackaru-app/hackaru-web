const SET_USER = 'SET_USER';

export const state = () => ({
  timeZone: 'Etc/UTC',
  receiveWeekReport: false,
  receiveMonthReport: false,
  startDay: 0,
});

export const actions = {
  async fetch({ commit }) {
    try {
      const res = await this.$api.request({
        url: '/v1/user',
        method: 'get',
        withCredentials: true,
      });
      commit(SET_USER, res.data);
      return true;
    } catch (e) {
      return false;
    }
  },
  async update({ commit }, data) {
    try {
      const res = await this.$api.request({
        url: '/v1/user',
        method: 'put',
        withCredentials: true,
        data: {
          user: data,
        },
      });
      commit(SET_USER, res.data);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const mutations = {
  [SET_USER](state, payload) {
    state.timeZone = payload.timeZone;
    state.receiveWeekReport = payload.receiveWeekReport;
    state.receiveMonthReport = payload.receiveMonthReport;
    state.startDay = payload.startDay;
    this.$i18n.setLocale(payload.locale);
  },
};

export const getters = {
  timeZone: (state) => {
    return state.timeZone;
  },
  startDay: (state) => {
    return state.startDay;
  },
  receiveWeekReport: (state) => {
    return state.receiveWeekReport;
  },
  receiveMonthReport: (state) => {
    return state.receiveMonthReport;
  },
};
