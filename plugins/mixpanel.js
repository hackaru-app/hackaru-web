import mixpanel from 'mixpanel-browser';

export default async ({ $config }, inject) => {
  mixpanel.init($config.mixpanelProjectToken);
  mixpanel.set_config({ debug: process.env.NODE_ENV !== 'production' });

  inject('mixpanel', mixpanel);
};
