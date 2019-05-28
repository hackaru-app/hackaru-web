import { webhook } from '@/schemas';

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/webhooks'
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: [webhook] },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async add({ commit, dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/webhooks',
          method: 'post',
          data: {
            webhook: payload
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: webhook },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async delete({ commit, dispatch }, id) {
    try {
      dispatch('entities/delete', { name: 'webhooks', id }, { root: true });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/webhooks/${id}`,
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
    return rootGetters['entities/getEntities']('webhooks', [webhook]);
  }
};
