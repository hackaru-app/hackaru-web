import { application } from '@/schemas';

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/oauth/authorized_applications'
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: [application] },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async delete({ commit, dispatch }, id) {
    try {
      dispatch('entities/delete', { name: 'applications', id }, { root: true });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/oauth/authorized_applications/${id}`,
          method: 'delete'
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('applications', [application]);
  }
};
