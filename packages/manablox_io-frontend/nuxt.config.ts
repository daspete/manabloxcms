// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  debug: false,

  runtimeConfig: {
    public: {
      API_URL: 'http://localhost',
      THUMBNAIL_ENDPOINT: 'http://localhost',
    },
  },

  css: ['~/assets/css/base.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost',
      },
    },
  },

  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    // importPT: { as: 'ManabloxUi', from: '~/ui/presets/manablox-ui' },
  },
});
