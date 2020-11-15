module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Hackaru',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple and open source time tracking app.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '512x512',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-640x1136.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-750x1294.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1242x2148.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1125x2436.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1536x2048.png',
        media:
          '(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1668x2224.png',
        media:
          '(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-2048x2732.png',
        media:
          '(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
  css: [{ src: 'normalize.css' }, { src: '~/assets/scss/main.scss' }],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#ffd96a' },
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
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
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
    '@nuxtjs/gtm',
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
  publicRuntimeConfig: {
    hackaruApiUrl: process.env.HACKARU_API_URL,
    hackaruApiTimeout: process.env.HACKARU_API_TIMEOUT,
    hackaruTermsUrl: process.env.HACKARU_TOS_AND_PRIVACY_URL,
    sentryDsn: process.env.SENTRY_DSN,
    sentryProject: process.env.SENTRY_PROJECT,
    sentryRelease: process.env.SENTRY_RELEASE,
    delightedToken: process.env.DELIGHTED_TOKEN,
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },
  styleResources: {
    scss: ['./assets/scss/modules/*.scss'],
  },
  manifest: {
    name: 'Hackaru',
    short_name: 'Hackaru',
    lang: 'ja',
    theme_color: '#262b38',
  },
  gtm: {
    debug: process.env.NODE_ENV !== 'production',
  },
  sentry: {
    disableClientSide: true,
    sourceMapStyle: 'hidden-source-map',
    config: {
      release: process.env.SENTRY_RELEASE,
    },
  },
  meta: {
    appleStatusBarStyle: 'black-translucent',
    mobileAppIOS: true,
  },
  toast: {
    position: 'bottom-center',
    duration: 3000,
  },
  serverMiddleware: ['~/api/x-xss-protection'],
  helmet: {
    xssFilter: false,
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
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'connect-src': [
          process.env.HACKARU_API_URL,
          'https://*.sentry.io',
          'https://sentry.io',
          'https://www.google-analytics.com',
          'https://web.delighted.com',
          'wss://ws.pusherapp.com/app/7fa7ab308aa09e4f2ae1',
        ],
        'script-src': [
          'https://d2yyd1h5u9mauk.cloudfront.net',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          "'unsafe-inline'",
          "'self'",
        ],
        'style-src': [
          'https://fonts.googleapis.com',
          "'unsafe-inline'",
          "'self'",
        ],
        'img-src': [
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'data:',
          "'self'",
        ],
        'font-src': ['https://fonts.gstatic.com'],
        'default-src': ["'self'"],
        'frame-src': ["'none'"],
        'object-src': ["'none'"],
        'upgrade-insecure-requests': [],
        'report-uri': [process.env.SENTRY_CSP_REPORT_URI],
      },
    },
  },
};
