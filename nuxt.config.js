function buildStartupImages(images) {
  return images.map((image) => ({
    rel: 'apple-touch-startup-image',
    href: image.href,
    media: [
      `(device-width: ${image.width})`,
      `(device-height: ${image.height})`,
      `(-webkit-device-pixel-ratio: ${image.ratio})`,
      `(orientation: portrait)`,
    ].join(' and '),
  }));
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400',
      },
      ...buildStartupImages([
        {
          href: '/apple-splash-2048-2732.png',
          width: '1024px',
          height: '1366px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1668-2388.png',
          width: '834px',
          height: '1194px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1536-2048.png',
          width: '768px',
          height: '1024px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1668-2224.png',
          width: '834px',
          height: '1112px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1620-2160.png',
          width: '810px',
          height: '1080px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1284-2778.png',
          width: '428px',
          height: '926px',
          ratio: 3,
        },
        {
          href: '/apple-splash-1170-2532.png',
          width: '390px',
          height: '844px',
          ratio: 3,
        },
        {
          href: '/apple-splash-1125-2436.png',
          width: '375px',
          height: '812px',
          ratio: 3,
        },
        {
          href: '/apple-splash-1242-2688.png',
          width: '414px',
          height: '896px',
          ratio: 3,
        },
        {
          href: '/apple-splash-828-1792.png',
          width: '414px',
          height: '896px',
          ratio: 2,
        },
        {
          href: '/apple-splash-1242-2208.png',
          width: '414px',
          height: '736px',
          ratio: 3,
        },
        {
          href: '/apple-splash-750-1334.png',
          width: '375px',
          height: '667px',
          ratio: 2,
        },
        {
          href: '/apple-splash-640-1136.png',
          width: '320px',
          height: '568px',
          ratio: 2,
        },
      ]),
    ],
  },
  css: ['ress', { src: '~/assets/scss/main.scss' }],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#ffd96a',
  },
  /*
   ** Plugins
   */
  plugins: [
    { src: '~/plugins/customs/mezr', ssr: false },
    { src: '~/plugins/customs/platform', ssr: false },
    { src: '~/plugins/customs/px-min' },
    { src: '~/plugins/vue-timers', ssr: false },
    { src: '~/plugins/persist-state.js', ssr: false },
    { src: '~/plugins/v-tooltip', ssr: false },
    { src: '~/plugins/sentry-client', ssr: false },
    { src: '~/plugins/load-script', ssr: false },
    { src: '~/plugins/v-scroll-lock', ssr: false },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/api' },
    { src: '~/plugins/logrocket' },
  ],
  /*
   ** Build configuration
   */
  build: {
    hardSource: process.env.NODE_ENV !== 'production',
    extend(config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  /**
   ** Enable poll for Docker
   */
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ['.nuxt', 'node_modules'],
    },
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    'nuxt-helmet',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ja',
            name: '日本語',
          },
          {
            code: 'en',
            name: 'English',
          },
        ],
        defaultLocale: 'en',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en',
        },
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true,
        },
      },
    ],
  ],
  buildModules: ['@nuxtjs/google-analytics'],
  publicRuntimeConfig: {
    hackaruApiTimeout: process.env.HACKARU_API_TIMEOUT,
    hackaruTermsUrl: process.env.HACKARU_TOS_AND_PRIVACY_URL,
    sentryDsn: process.env.SENTRY_DSN,
    sentryProject: process.env.SENTRY_PROJECT,
    sentryRelease: process.env.SENTRY_RELEASE,
    mixpanelProjectToken: process.env.MIXPANEL_PROJECT_TOKEN,
    delightedToken: process.env.DELIGHTED_TOKEN,
    logRocketId: process.env.LOGROCKET_ID,
    logRocketRelease: process.env.LOGROCKET_RELEASE,
    axios: {
      browserBaseURL: process.env.HACKARU_API_URL,
    },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
  styleResources: {
    scss: ['./assets/scss/modules/*.scss'],
  },
  axios: {
    progress: false,
    debug: process.env.NODE_ENV !== 'production',
  },
  googleAnalytics: {
    debug: {
      enabled: process.env.NODE_ENV !== 'production',
      sendHitTask: process.env.NODE_ENV === 'production',
    },
    autoTracking: {
      transformQueryString: false,
      pageviewTemplate(route) {
        return {
          page: route.path,
          title: document.title,
          location: undefined,
        };
      },
    },
  },
  sentry: {
    disableClientSide: true,
    sourceMapStyle: 'hidden-source-map',
    config: {
      release: process.env.SENTRY_RELEASE,
    },
  },
  toast: {
    position: 'bottom-center',
    duration: 3000,
  },
  helmet: {
    hsts: {
      maxAge: 3600,
      preload: true,
    },
    expectCt: {
      enforce: false,
      reportUri: process.env.SENTRY_EXPECT_CT_REPORT_URI,
    },
    frameguard: {
      action: 'deny',
    },
  },
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'connect-src': [
          process.env.HACKARU_API_URL,
          'https://*.sentry.io',
          'https://sentry.io',
          'https://www.google-analytics.com',
          'https://web.delighted.com',
          'https://translate.googleapis.com',
          'wss://ws.pusherapp.com/app/7fa7ab308aa09e4f2ae1',
          'https://*.logrocket.io',
          'https://*.lr-ingest.io',
          'https://*.logrocket.com',
          'https://api-js.mixpanel.com',
        ],
        'script-src': [
          'https://d2yyd1h5u9mauk.cloudfront.net',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://translate.google.com',
          "'unsafe-inline'",
          'https://cdn.logrocket.io',
          'https://cdn.lr-ingest.io',
          "'self'",
        ],
        'style-src': [
          'https://fonts.googleapis.com',
          'https://translate.googleapis.com',
          "'unsafe-inline'",
          "'self'",
        ],
        'img-src': [
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://translate.google.com',
          'https://www.gstatic.com',
          'data:',
          "'self'",
        ],
        'child-src': ['blob:', "'self'"],
        'worker-src': ['blob:', "'self'"],
        'font-src': ['https://fonts.gstatic.com'],
        'default-src': ["'self'"],
        'frame-src': ["'none'"],
        'object-src': ["'none'"],
        'upgrade-insecure-requests': [],
        'report-uri': [process.env.SENTRY_CSP_REPORT_URI],
      },
    },
  },
  pwa: {
    meta: {
      viewport:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
      mobileAppIOS: false,
      appleStatusBarStyle: 'black-translucent',
      name: 'Hackaru',
      description: 'A simple time tracking app',
      theme_color: '#262b38',
    },
    manifest: {
      name: 'Hackaru',
      short_name: 'Hackaru',
      description: 'A simple time tracking app',
    },
  },
};
