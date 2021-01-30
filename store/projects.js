import { project } from '@/schemas';

export const actions = {
  async fetch({ dispatch }) {
    const res = await this.$api.request(
      {
        url: '/v1/projects',
        withCredentials: true,
      },
      { root: true }
    );
    dispatch(
      'entities/merge',
      { json: res.data, schema: [project] },
      { root: true }
    );
  },
  async add({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: '/v1/projects',
        method: 'post',
        withCredentials: true,
        data: {
          project: payload,
        },
      });
      dispatch(
        'entities/merge',
        { json: res.data, schema: project },
        { root: true }
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  async update({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: `/v1/projects/${payload.id}`,
        method: 'put',
        withCredentials: true,
        data: {
          project: payload,
        },
      });
      dispatch(
        'entities/merge',
        { json: res.data, schema: project },
        { root: true }
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  async delete({ dispatch }, id) {
    try {
      dispatch('entities/delete', { name: 'projects', id }, { root: true });
      await this.$api.request({
        url: `/v1/projects/${id}`,
        method: 'delete',
        withCredentials: true,
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const getters = {
  all(_state, _getters, _rootState, rootGetters) {
    return rootGetters['entities/getEntities']('projects', [project]);
  },
};
