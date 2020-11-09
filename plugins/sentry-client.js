import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

export default async ({ app }, inject) => {
  Sentry.init({
    dsn: app.$config.sentryDsn,
    release: `${app.$config.sentryProject}@${app.$config.sentryRelease}`,
    integrations: [
      new Integrations.BrowserTracing(),
      new VueIntegration({
        Vue,
        tracing: true,
        attachProps: true,
        tracingOptions: {
          trackComponents: true,
        },
      }),
    ],
    tracesSampleRate: 1.0,
  });

  inject('sentry', Sentry);
};
