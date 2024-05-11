// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,

  css: ["~/assets/css/base.css"],

  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss", "nuxt-primevue"],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://api.manablox.test/graphql",
      },
    },
  },

  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { as: "ManabloxUi", from: "~/ui/presets/manablox-ui" },
  },
});
