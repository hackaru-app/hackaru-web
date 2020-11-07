import Vue from 'vue';
import VueGtm from 'vue-gtm';

export default async ({ app }) => {
  Vue.use(VueGtm, {
    id: app.$config.googleTagManagerId,
    enabled: !!app.$config.googleTagManagerId,
    debug: process.env.NODE_ENV !== 'production',
    vueRouter: app.router,
  });
};
