import mixpanel from 'mixpanel-browser';

function isStandalone() {
  return (
    navigator.standalone ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

export default async ({ app, $config }, inject) => {
  mixpanel.init($config.mixpanelProjectToken);
  mixpanel.set_config({
    debug: process.env.NODE_ENV !== 'production',
    property_blacklist: ['$current_url', '$initial_referrer', '$referrer'],
  });

  app.router.afterEach((to) =>
    mixpanel.track('View page', {
      path: to.path,
    })
  );

  mixpanel.register({
    standalone: isStandalone(),
  });

  inject('mixpanel', mixpanel);
};