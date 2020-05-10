import { project } from '@/schemas';

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/projects',
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: [project] },
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
          url: '/v1/projects',
          method: 'post',
          data: {
            project: payload,
          },
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: project },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async update({ commit, dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: `/v1/projects/${payload.id}`,
          method: 'put',
          data: {
            project: payload,
          },
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: project },
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
      dispatch('entities/delete', { name: 'projects', id }, { root: true });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/projects/${id}`,
          method: 'delete',
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('projects', [project]);
  },
};
