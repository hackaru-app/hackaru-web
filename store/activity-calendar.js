import { stringify } from 'query-string';

export const SET_TOKEN_AND_USER_ID = 'SET_TOKEN_AND_USER_ID';

export const state = () => ({
  baseUrl: '',
  token: '',
  userId: '',
});

export const actions = {
  async createUrl({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        { url: '/v1/activity_calendar', method: 'put' },
        { root: true }
      );
      commit(SET_TOKEN_AND_USER_ID, {
        token: res.data.token,
        userId: res.data.userId,
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
};

export const mutations = {
  [SET_TOKEN_AND_USER_ID](state, payload) {
    state.baseUrl = this.$env.HACKARU_API_URL.replace(/^https?/, 'webcal');
    state.token = payload.token;
    state.userId = payload.userId;
  },
};

export const getters = {
  webcalUrl: (state, getter) => {
    return `${state.baseUrl}/v1/activity_calendar?${stringify({
      token: state.token,
      user_id: state.userId,
    })}`;
  },
  googleCalendarUrl: (state, getter) => {
    return `https://www.google.com/calendar/render?${stringify({
      cid: getter.webcalUrl,
    })}`;
  },
};
