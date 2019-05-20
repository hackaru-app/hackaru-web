import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

const stub = { event: () => {}, set: () => {} };

export default async ({ app }) => {
  const id = app.$env.GOOGLE_ANALYTICS_TRACKING_ID;
  if (!id) return stub;
  Vue.use(VueAnalytics, { router: app.router, id });
};
