export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Slate Books - Viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '/js/iconify.min.js',
      },
      {
        src: '/js/jquery-3.5.1.slim.min.js',
      },
      {
        src: '/js/bootstrap.bundle.min.js',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '@/assets/css/all.css'
  ],
  
  router: {
    middleware: 'route-guard'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/iziToast', mode: 'client' },
    '~/plugins/axios',
    '~/plugins/persistedState.client.js',
    '~/plugins/dateFormat',
    { src: '~/plugins/calender', mode: 'client' },
    { src: '~/plugins/vue-star-rating.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
