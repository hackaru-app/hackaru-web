import get from 'lodash.get';

export const SET_CLIENT = 'SET_CLIENT';

export const state = () => ({
  client: {}
});

export const actions = {
  async fetchClient({ commit, dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          params: {
            clientId: payload.clientId,
            responseType: payload.responseType,
            redirectUri: payload.redirectUri,
            scope: payload.scope,
            state: payload.state
          }
        },
        { root: true }
      );
      if (data.status === 'redirect') return data.redirectUri;
      commit(SET_CLIENT, data);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async allow({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'post',
          data: {
            clientId: payload.clientId,
            responseType: payload.responseType,
            redirectUri: payload.redirectUri,
            scope: payload.scope,
            state: payload.state
          }
        },
        { root: true }
      );
      return res.data.redirectUri;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return undefined;
    }
  },
  async deny({ commit, dispatch }, payload) {
    try {
      await dispatch(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'delete',
          data: {
            clientId: payload.clientId,
            responseType: payload.responseType,
            redirectUri: payload.redirectUri,
            scope: payload.scope,
            state: payload.state
          }
        },
        { root: true }
      );
    } catch (e) {
      const response = getRedirectUriByError(e) || getDescriptionByError(e);
      if (response) return response;
      dispatch('toast/error', e, { root: true });
    }
  }
};

function getRedirectUriByError(e) {
  return get(e, 'response.data.redirect_uri');
}

function getDescriptionByError(e) {
  const errorDescription = get(e, 'response.data.error_description');
  return errorDescription && { errorDescription };
}

export const mutations = {
  [SET_CLIENT](state, payload) {
    state.client = {
      name: payload.clientName,
      scopes: payload.scope.split(' '),
      responseType: payload.responseType,
      state: payload.state
    };
  }
};

export const getters = {
  client(state) {
    return state.client;
  }
};
