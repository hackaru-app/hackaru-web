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
        content: 'width=device-width, initial-scale=1, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple and open source time tracking app.'
      },
      { hid: 'theme-color', name: 'theme-color', content: '#3f4961' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '512x512'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-640x1136.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-750x1294.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1242x2148.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1125x2436.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1536x2048.png',
        media:
          '(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-1668x2224.png',
        media:
          '(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/launch-2048x2732.png',
        media:
          '(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)'
      }
    ]
  },
  css: [
    { src: 'normalize.css' },
    { src: '~/assets/sass/main.scss' },
    { src: 'v-calendar/lib/v-calendar.min.css' },
    { src: 'vue-js-modal/dist/styles.css' }
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#ffd96a' },
  /*
   ** Plugins
   */
  plugins: [
    { src: '~/plugins/directives/v-dragdrop' },
    { src: '~/plugins/directives/v-window-scroll' },
    { src: '~/plugins/customs/i18n-cacher', ssr: false },
    { src: '~/plugins/customs/mezr', ssr: false },
    { src: '~/plugins/vue-timers', ssr: false },
    { src: '~/plugins/v-calendar', ssr: false },
    { src: '~/plugins/local-storage.js', ssr: false },
    { src: '~/plugins/vue-analytics.js', ssr: false },
    { src: '~/plugins/vue-js-modal' }
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
          exclude: /(node_modules)/
        });
      }
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      });
    }
  },
  /**
   ** Enable poll for Docker
   */
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ['.nuxt', 'node_modules']
    }
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'nuxt-sass-resources-loader',
    [
      'nuxt-i18n',
      {
        locales: [{ code: 'ja', iso: 'ja' }, { code: 'en', iso: 'en-US' }],
        defaultLocale: 'en',
        vueI18nLoader: true
      }
    ],
    [
      'nuxt-env',
      {
        keys: [
          { key: 'HACKARU_API_URL' },
          { key: 'GOOGLE_ANALYTICS_TRACKING_ID' }
        ]
      }
    ]
  ],
  sassResources: ['~/assets/sass/modules/*.scss'],
  manifest: {
    name: 'Hackaru',
    lang: 'ja'
  },
  meta: {
    appleStatusBarStyle: 'black-translucent',
    mobileAppIOS: true
  },
  toast: {
    position: 'bottom-center',
    duration: 3000
  }
};
