import applyCaseMiddleware from 'axios-case-converter';

export function createPlugin({ store, $config, $axios }) {
  const api = $axios.create({
    timeout: $config.hackaruApiTimeout,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  applyCaseMiddleware(api, {
    ignoreHeaders: true,
  });

  api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = store.$i18n.locale;
    return config;
  });

  api.interceptors.response.use(undefined, (error) => {
    if (error.response?.status === 401) {
      store.dispatch('auth/forceLogout');
    } else {
      store.dispatch('toast/error', error);
      throw error;
    }
  });

  return api;
}

export default function (context, inject) {
  inject('api', createPlugin(context));
}
