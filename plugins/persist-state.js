import createPersistedState from 'vuex-persistedstate';

export default ({ app, store, isDev }) => {
  createPersistedState({
    paths: ['auth.loggedIn', 'auth.id', 'auth.email'],
    storage: {
      getItem(key) {
        return app.$cookies.get(key, {
          parseJSON: false,
        });
      },
      removeItem(key) {
        if (process.client) {
          app.$cookies.remove(key, { path: '/' });
        }
      },
      setItem(key, value) {
        if (process.client) {
          const permanent = 60 * 60 * 24 * 365 * 20;
          app.$cookies.set(key, value, {
            path: '/',
            maxAge: permanent,
            secure: !isDev,
            sameSite: 'Lax',
          });
        }
      },
    },
  })(store);
};
