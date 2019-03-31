import { project } from '@/schemas';

export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export const state = () => ({
  items: []
});

export const actions = {
  async getProjects({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        { url: '/v1/projects' },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [project] },
        { root: true }
      );
      commit(SET_PROJECTS, data.result);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async addProject({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/projects',
          method: 'post',
          data: {
            project: {
              ...payload
            }
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: project },
        { root: true }
      );
      commit(ADD_PROJECT, data.result);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
    return false;
  },
  async updateProject({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: `/v1/projects/${payload.id}`,
          method: 'put',
          data: {
            project: {
              ...payload
            }
          }
        },
        { root: true }
      );
      await dispatch(
        'entities/normalize',
        { json: res.data, schema: project },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
    return false;
  },
  async deleteProject({ commit, dispatch }, id) {
    try {
      commit(REMOVE_PROJECT, id);
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/projects/${id}`,
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
  [SET_PROJECTS](state, payload) {
    state.items = payload;
  },
  [ADD_PROJECT](state, payload) {
    state.items = [...state.items, payload];
  },
  [REMOVE_PROJECT](state, payload) {
    state.items = state.items.filter(id => id !== payload);
  }
};

export const getters = {
  getProjects(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [project]);
  }
};
