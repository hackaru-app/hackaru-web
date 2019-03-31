import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

export default async ({ app }) => {
  const id = app.$env.GOOGLE_ANALYTICS_TRACKING_ID;

  // Set dummy $ga if don't use GoogleAnalytics
  if (!id) {
    Vue.prototype.$ga = {
      event: () => {},
      set: () => {}
    };
    return;
  }

  Vue.use(VueAnalytics, { router: app.router, id });
};
