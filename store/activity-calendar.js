import { stringify } from 'query-string';

export const SET_TOKEN_AND_USER_ID = 'SET_TOKEN_AND_USER_ID';

export const state = () => ({
  baseUrl: '',
  token: '',
  userId: '',
});

export const actions = {
  async createUrl({ commit }) {
    try {
      const res = await this.$api.request({
        url: '/v1/activity_calendar',
        method: 'put',
        withCredentials: true,
      });
      commit(SET_TOKEN_AND_USER_ID, {
        token: res.data.token,
        userId: res.data.userId,
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const mutations = {
  [SET_TOKEN_AND_USER_ID](state, payload) {
    state.baseUrl = this.$config.axios.browserBaseURL;
    state.token = payload.token;
    state.userId = payload.userId;
  },
};

export const getters = {
  calendarUrl: (state) => {
    return `${state.baseUrl}/v1/activity_calendar?${stringify({
      token: state.token,
      user_id: state.userId,
    })}`;
  },
};
