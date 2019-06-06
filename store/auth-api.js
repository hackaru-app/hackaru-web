import merge from 'lodash.merge';

export const actions = {
  async request({ dispatch, rootGetters }, config) {
    if (!rootGetters['auth/loggedIn']) throw Error(undefined);
    if (!rootGetters['auth/validateToken']()) {
      await dispatch('auth/fetchAccessToken', {}, { root: true });
    }
    return await dispatch(
      'api/request',
      merge(config, {
        headers: {
          'x-access-token': rootGetters['auth/accessToken']
        }
      }),
      { root: true }
    );
  }
};
