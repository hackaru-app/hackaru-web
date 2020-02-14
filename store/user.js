const SET_USER = 'SET_USER';

export const state = () => ({
  timeZone: 'Etc/UTC',
  receiveWeekReport: false,
  receiveMonthReport: false
});

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/user',
          method: 'get'
        },
        { root: true }
      );
      commit(SET_USER, res.data);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async update({ commit, dispatch }, data) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/user',
          method: 'put',
          data: {
            user: data
          }
        },
        { root: true }
      );
      commit(SET_USER, res.data);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const mutations = {
  [SET_USER](state, payload) {
    state.timeZone = payload.timeZone;
    state.receiveWeekReport = payload.receiveWeekReport;
    state.receiveMonthReport = payload.receiveMonthReport;
    this.$i18n.setLocale(payload.locale);
  }
};

export const getters = {
  timeZone: state => {
    return state.timeZone;
  },
  receiveWeekReport: state => {
    return state.receiveWeekReport;
  },
  receiveMonthReport: state => {
    return state.receiveMonthReport;
  }
};
