export const SET_CLIENT = 'SET_CLIENT';

export const state = () => ({
  client: {}
});

export const actions = {
  async getClient({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
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
      const { redirectUri, status } = res.data;
      if (redirectUri && status === 'redirect') return redirectUri;
      commit(SET_CLIENT, res.data);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
    return undefined;
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
      if (!e.response || !e.response.data) {
        dispatch('toast/error', e, { root: true });
        return undefined;
      }
      const redirectUri = e.response.data.redirect_uri;
      if (redirectUri) return redirectUri;

      const errorDescription = e.response.data.error_description;
      return { errorDescription };
    }
  }
};

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
  getClient(state) {
    return state.client;
  }
};
