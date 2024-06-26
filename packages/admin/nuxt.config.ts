// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  debug: true,

  runtimeConfig: {
    public: {
      API_URL: '',
      UPLOAD_ENDPOINT: '',
      THUMBNAIL_ENDPOINT: '',
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
        httpEndpoint: '',
        defaultOptions: {
          query: {
            fetchPolicy: 'network-only',
          },
        },
      },
    },
  },

  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { as: 'ManabloxUi', from: '~/ui/presets/manablox-ui' },
  },
});
