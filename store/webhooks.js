import { webhook } from '@/schemas';

export const SET_WEBHOOKS = 'SET_WEBHOOKS';
export const ADD_WEBHOOK = 'ADD_WEBHOOK';
export const REMOVE_WEBHOOK = 'REMOVE_WEBHOOK';

export const state = () => ({
  items: []
});

export const actions = {
  async getWebhooks({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        { url: '/v1/webhooks' },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [webhook] },
        { root: true }
      );
      commit(SET_WEBHOOKS, data.result);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },

  async addWebhook({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/webhooks',
          method: 'post',
          data: {
            webhook: {
              ...payload
            }
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: webhook },
        { root: true }
      );
      commit(ADD_WEBHOOK, data.result);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
    return false;
  },

  async deleteWebhook({ commit, dispatch }, id) {
    try {
      commit(REMOVE_WEBHOOK, id);
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
    }
    return false;
  }
};

export const mutations = {
  [SET_WEBHOOKS](state, payload) {
    state.items = payload;
  },
  [ADD_WEBHOOK](state, payload) {
    state.items = [...state.items, payload];
  },
  [REMOVE_WEBHOOK](state, payload) {
    state.items = state.items.filter(id => id !== payload);
  }
};

export const getters = {
  getWebhooks(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [webhook]);
  }
};
