import Vue from 'vue';
import VueGtm from 'vue-gtm';

export default async ({ app }) => {
  Vue.use(VueGtm, {
    id: app.$env.GOOGLE_TAG_MANAGER_ID,
    enabled: !!app.$env.GOOGLE_TAG_MANAGER_ID,
    vueRouter: app.router
  });
};
