import mixpanel from 'mixpanel-browser';

export default async ({ $config }, inject) => {
  mixpanel.init($config.mixpanelProjectToken);

  inject('mixpanel', mixpanel);
};
