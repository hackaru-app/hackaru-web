export const SET_CLIENT = 'SET_CLIENT';

export const state = () => ({
  client: {},
});

export const actions = {
  async fetchClient({ commit }, payload) {
    const res = await this.$api.request(
      {
        url: '/v1/oauth/authorize',
        withCredentials: true,
        params: {
          clientId: payload.clientId,
          responseType: payload.responseType,
          redirectUri: payload.redirectUri,
          scope: payload.scope,
          state: payload.state,
        },
      },
      { root: true }
    );
    if (res.data.status === 'redirect') {
      return res.data.redirectUri;
    } else {
      commit(SET_CLIENT, res.data);
    }
  },
  async allow(_, payload) {
    const res = await this.$api.request(
      {
        url: '/v1/oauth/authorize',
        withCredentials: true,
        method: 'post',
        data: {
          clientId: payload.clientId,
          responseType: payload.responseType,
          redirectUri: payload.redirectUri,
          scope: payload.scope,
          state: payload.state,
        },
      },
      { root: true }
    );
    return res.data.redirectUri;
  },
  async deny(_, payload) {
    const res = await this.$api.request({
      url: '/v1/oauth/authorize',
      withCredentials: true,
      method: 'delete',
      validateStatus(status) {
        return status === 400;
      },
      data: {
        clientId: payload.clientId,
        responseType: payload.responseType,
        redirectUri: payload.redirectUri,
        scope: payload.scope,
        state: payload.state,
      },
    });
    return res.data.redirectUri || getDescriptionFromError(res);
  },
};

function getDescriptionFromError(res) {
  const errorDescription = res.data.errorDescription;
  return errorDescription && { errorDescription };
}

export const mutations = {
  [SET_CLIENT](state, payload) {
    state.client = {
      name: payload.clientName,
      scopes: payload.scope.split(' '),
      responseType: payload.responseType,
      state: payload.state,
    };
  },
};

export const getters = {
  client(state) {
    return state.client;
  },
};
