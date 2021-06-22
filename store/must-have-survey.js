const SET_ANSWERABLE = 'SET_ANSWERABLE';

export const state = () => ({
  answerable: undefined,
});

export const actions = {
  async fetchAnswerable({ commit }) {
    try {
      const res = await this.$api.request({
        url: '/v1/must_have_survey/answerable',
        method: 'get',
        withCredentials: true,
      });
      commit(SET_ANSWERABLE, res.data.answerable);
      return true;
    } catch (e) {
      return false;
    }
  },
  async answer(_, payload) {
    try {
      await this.$api.request({
        url: '/v1/must_have_survey',
        method: 'post',
        withCredentials: true,
        data: {
          mustHaveSurvey: payload,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const mutations = {
  [SET_ANSWERABLE](state, payload) {
    state.answerable = payload;
  },
};

export const getters = {
  answerable: (state) => {
    return state.answerable;
  },
};
