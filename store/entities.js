import merge from 'lodash.merge';
import { normalize, denormalize } from 'normalizr';

export const MERGE_ENTITIES = 'MERGE_ENTITIES';

export const state = () => ({
  data: {}
});

export const actions = {
  async normalize({ commit }, { json, schema }) {
    const data = normalize(json, schema);
    commit(MERGE_ENTITIES, data.entities);
    return data;
  }
};

export const mutations = {
  [MERGE_ENTITIES](state, payload) {
    state.data = { ...merge(state.data, payload) };
  }
};

export const getters = {
  getDenormalized: (state, getter) => (result, schema) => {
    return denormalize(result, schema, state.data);
  }
};
