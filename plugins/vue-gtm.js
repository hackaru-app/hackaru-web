import Vue from 'vue';
import VueGtm from 'vue-gtm';

export default async ({ app }) => {
  const enabled = !!app.$config.googleTagManagerId;
  Vue.use(VueGtm, {
    enabled,
    id: enabled ? app.$config.googleTagManagerId : [],
    debug: process.env.NODE_ENV !== 'production',
    vueRouter: app.router,
  });
};
