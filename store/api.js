import merge from 'lodash.merge';
import applyCaseMiddleware from 'axios-case-converter';
import translations from '@/assets/locales/store/api.json';

function findErrorLocaleKey(message) {
  if (message === 'Request aborted') {
    return 'errors.request_aborted';
  } else if (message === 'Network Error') {
    return 'errors.network_error';
  } else if (/^timeout of \d+ms exceeded$/.test(message)) {
    return 'errors.timeout';
  }
}

export const actions = {
  async request(_, config) {
    try {
      const client = applyCaseMiddleware(this.$axios.create(), {
        ignoreHeaders: true,
      });
      return await client.request(
        merge(config, {
          timeout: this.$config.hackaruApiTimeout,
          headers: { 'Accept-Language': this.$i18n.locale },
        })
      );
    } catch (error) {
      if (findErrorLocaleKey(error.message)) {
        const locale = this.$i18n.locale;
        this.$i18n.setLocaleMessage(locale, translations[locale]);
        throw new Error(this.$i18n.t(findErrorLocaleKey(error.message)));
      } else {
        throw error;
      }
    }
  },
};
