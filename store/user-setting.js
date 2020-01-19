const SET_USER_SETTING = 'SET_USER_SETTING';

export const state = () => ({
  receiveWeekReport: false,
  receiveMonthReport: false
});

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/user_setting',
          method: 'get'
        },
        { root: true }
      );
      commit(SET_USER_SETTING, res.data);
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
          url: '/v1/user_setting',
          method: 'put',
          data: data
        },
        { root: true }
      );
      commit(SET_USER_SETTING, res.data);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const mutations = {
  [SET_USER_SETTING](state, payload) {
    state.receiveWeekReport = payload.receiveWeekReport;
    state.receiveMonthReport = payload.receiveMonthReport;
  }
};

export const getters = {
  receiveWeekReport: state => {
    return state.receiveWeekReport;
  },
  receiveMonthReport: state => {
    return state.receiveMonthReport;
  }
};
