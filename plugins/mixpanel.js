import mixpanel from 'mixpanel-browser';

function isStandalone() {
  return (
    navigator.standalone ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

function createMock() {
  const noop = () => {};
  return {
    track: noop,
    reset: noop,
    identify: noop,
  };
}

export default async ({ app, $config }, inject) => {
  if (!$config.mixpanelProjectToken) {
    return inject('mixpanel', createMock());
  }

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
    repository: 'hackaru-web',
    standalone: isStandalone(),
  });

  inject('mixpanel', mixpanel);
};
