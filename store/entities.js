import merge from 'lodash.merge';
import omit from 'lodash.omit';

import { normalize, denormalize } from 'normalizr';

export const state = () => ({
  entities: {}
});

export const actions = {
  merge({ commit }, { json, schema }) {
    const { entities } = normalize(json, schema);
    commit('MERGE_ENTITIES', entities);
  },
  delete({ commit }, { name, id }) {
    commit('DELETE_ENTITY', { name, id });
  }
};

export const mutations = {
  MERGE_ENTITIES(state, payload) {
    state.entities = { ...merge(state.entities, payload) };
  },
  DELETE_ENTITY(state, { name, id }) {
    state.entities = {
      ...state.entities,
      [name]: omit(state.entities[name], id)
    };
  }
};

export const getters = {
  getEntities: state => (name, schema) => {
    const ids = Object.keys(state.entities[name] || {});
    return denormalize(ids, schema, state.entities);
  }
};
