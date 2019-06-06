import decodeJwt from 'jwt-decode';

const SET_USER = 'SET_USER';
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const CLEAR_TOKENS_AND_USER = 'CLEAR_TOKENS_AND_USER';

export const state = () => ({
  id: undefined,
  email: '',
  refreshToken: '',
  clientId: '',
  accessToken: ''
});

export const actions = {
  async fetchRefreshToken({ commit, dispatch }, { email, password }) {
    try {
      const res = await dispatch(
        'api/request',
        {
          url: '/v1/auth/refresh_tokens',
          method: 'post',
          data: {
            user: {
              email,
              password
            }
          }
        },
        { root: true }
      );
      commit(SET_USER, res.data);
      commit(SET_REFRESH_TOKEN, {
        refreshToken: res.headers['x-refresh-token'],
        clientId: res.headers['x-client-id']
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async fetchAccessToken({ state, commit, dispatch, getters }) {
    try {
      const res = await dispatch(
        'api/request',
        {
          url: '/v1/auth/access_tokens',
          method: 'post',
          headers: {
            'x-client-id': state.clientId,
            'x-refresh-token': state.refreshToken
          }
        },
        { root: true }
      );
      commit(SET_ACCESS_TOKEN, res.headers['x-access-token']);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async signUp(
    { commit, dispatch },
    { email, password, passwordConfirmation }
  ) {
    try {
      const res = await dispatch(
        'api/request',
        {
          url: '/v1/auth/users',
          method: 'post',
          data: {
            user: {
              email,
              password,
              passwordConfirmation
            }
          }
        },
        { root: true }
      );
      commit(SET_USER, res.data);
      commit(SET_REFRESH_TOKEN, {
        refreshToken: res.headers['x-refresh-token'],
        clientId: res.headers['x-client-id']
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async changeEmail({ state, commit, dispatch }, { email, currentPassword }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: `/v1/auth/user`,
          method: 'put',
          data: {
            user: {
              email,
              currentPassword
            }
          }
        },
        { root: true }
      );
      commit(SET_USER, res.data);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async changePassword(
    { state, commit, dispatch },
    { password, passwordConfirmation, currentPassword }
  ) {
    try {
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/auth/user`,
          method: 'put',
          data: {
            user: {
              password,
              passwordConfirmation,
              currentPassword
            }
          }
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async sendPasswordResetEmail({ state, commit, dispatch }, { email }) {
    try {
      await dispatch(
        'api/request',
        {
          url: '/v1/auth/password_reset/mails',
          method: 'post',
          data: {
            user: {
              email
            }
          }
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async resetPassword(
    { state, commit, dispatch },
    { password, passwordConfirmation, token, id }
  ) {
    try {
      await dispatch(
        'api/request',
        {
          url: '/v1/auth/password_reset',
          method: 'put',
          data: {
            user: {
              id,
              token,
              password,
              passwordConfirmation
            }
          }
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async logout({ state, commit, dispatch }) {
    await dispatch(
      'api/request',
      {
        url: '/v1/auth/refresh_token',
        method: 'delete',
        headers: {
          'x-client-id': state.clientId,
          'x-refresh-token': state.refreshToken
        }
      },
      { root: true }
    );
    commit(CLEAR_TOKENS_AND_USER);
  },
  async deleteAccount({ commit, dispatch }, { currentPassword }) {
    try {
      await dispatch(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'delete',
          data: {
            user: {
              currentPassword: currentPassword
            }
          }
        },
        { root: true }
      );
      commit(CLEAR_TOKENS_AND_USER);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  }
};

export const mutations = {
  [SET_REFRESH_TOKEN](state, payload) {
    state.refreshToken = payload.refreshToken;
    state.clientId = payload.clientId;
  },
  [SET_ACCESS_TOKEN](state, payload) {
    state.accessToken = payload;
  },
  [SET_USER](state, payload) {
    state.id = payload.id;
    state.email = payload.email;
  },
  [CLEAR_TOKENS_AND_USER](state, payload) {
    state.id = undefined;
    state.email = '';
    state.refreshToken = '';
    state.clientId = '';
    state.accessToken = '';
  }
};

export const getters = {
  accessToken: state => {
    return state.accessToken;
  },
  email: state => {
    return state.email;
  },
  userId: state => {
    return state.id;
  },
  loggedIn: (state, getters) => {
    return state.clientId && state.refreshToken;
  },
  validateToken: (state, getters) => () => {
    if (!state.accessToken) return false;
    try {
      return Date.now().valueOf() / 1000 < decodeJwt(state.accessToken).exp;
    } catch (e) {
      return false;
    }
  }
};
