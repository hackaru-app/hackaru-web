import get from 'lodash.get';

export const actions = {
  success(params, payload) {
    this.app.$toast.success(payload);
  },
  error(params, payload) {
    const message =
      get(payload, 'response.data.error_description') ||
      get(payload, 'response.data.message') ||
      get(payload, 'message');
    if (message) this.app.$toast.error(message);
  }
};
