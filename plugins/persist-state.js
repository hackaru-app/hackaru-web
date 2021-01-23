import createPersistedState from 'vuex-persistedstate';

export default ({ app, store, isDev }) => {
  const deprecatedStorage = {
    getItem(key) {
      if (process.client) {
        return window.localStorage.getItem(key);
      }
    },
    removeItem(key) {
      if (process.client) {
        window.localStorage.removeItem(key);
      }
    },
    setItem(key, value) {
      if (process.client) {
        window.localStorage.setItem(key, value);
      }
    },
  };

  createPersistedState({
    paths: ['auth'],
    storage: {
      getItem(key) {
        const item = app.$cookies.get(key, {
          parseJSON: false,
        });
        if (item === undefined) {
          return deprecatedStorage.getItem(key);
        } else {
          return item;
        }
      },
      removeItem(key) {
        if (process.client) {
          app.$cookies.remove(key, { path: '/' });
          deprecatedStorage.removeItem(key);
        }
      },
      setItem(key, value) {
        if (process.client) {
          const oneYear = 60 * 60 * 24 * 365;
          app.$cookies.set(key, value, {
            path: '/',
            maxAge: oneYear,
            secure: !isDev,
            sameSite: 'Lax',
          });
          deprecatedStorage.removeItem(key);
        }
      },
    },
  })(store);
};
