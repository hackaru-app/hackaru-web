import LogRocket from 'logrocket';

function init(app) {
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
}

export default async ({ app }, inject) => {
  if (app.$config.logRocketId) init(app);
  inject('logrocket', LogRocket);
};
