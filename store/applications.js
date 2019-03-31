import union from 'lodash.union';
import { application } from '@/schemas';

export const MERGE_APPLICATIONS = 'MERGE_APPLICATIONS';
export const REMOVE_APPLICATION = 'REMOVE_APPLICATION';

export const state = () => ({
  items: []
});

export const actions = {
  async getApplications({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        { url: '/v1/oauth/authorized_applications' },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [application] },
        { root: true }
      );
      commit(MERGE_APPLICATIONS, data.result);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },

  async deleteApplication({ commit, dispatch }, id) {
    try {
      commit(REMOVE_APPLICATION, id);
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/oauth/authorized_applications/${id}`,
          method: 'delete'
        },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const mutations = {
  [MERGE_APPLICATIONS](state, payload) {
    state.items = union(state.items, payload);
  },
  [REMOVE_APPLICATION](state, payload) {
    state.items = state.items.filter(id => id !== payload);
  }
};

export const getters = {
  getApplications(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [application]);
  }
};
