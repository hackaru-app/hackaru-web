import LogRocket from 'logrocket';

export default async ({ app }, inject) => {
  LogRocket.init(app.$config.logRocketId, {
    release: app.$config.logRocketRelease,
    dom: {
      textSanitizer: true,
      inputSanitizer: true,
    },
    network: {
      isEnabled: false,
    },
    console: {
      isEnabled: false,
    },
    browser: {
      urlSanitizer: (url) => url.split(/[?#]/)[0],
    },
  });

  LogRocket.getSessionURL((sessionURL) => {
    app.$sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
    app.$ga.event({
      eventCategory: 'LogRocket',
      eventAction: sessionURL,
    });
  });

  inject('logrocket', LogRocket);
};
