import merge from 'lodash.merge';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const actions = {
  async request(state, config) {
    const res = await axios.request(
      merge(
        {
          ...config,
          data: snakecaseKeys(config.data || {}),
          params: snakecaseKeys(config.params || {})
        },
        {
          baseURL: this.$env.HACKARU_API_URL,
          timeout: 10000,
          headers: { 'Accept-Language': this.app.i18n.locale }
        }
      )
    );
    return {
      data: camelcaseKeys(res.data || {}, { deep: true }),
      headers: res.headers
    };
  }
};
