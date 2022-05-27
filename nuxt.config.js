import fa from "vuetify/es5/locale/fa";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s | 118 اینترنتی شرکت مخابرات",
    title: "2118",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: "~/components/loading.vue",

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/scss/custom.scss"],
  styleResources: {
    scss: ["./assets/scss/_variables.scss"],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/swiper.client.js", 
    "~/plugins/bp-vuejs-dropdown.client.js",
    "~/plugins/vue-zoomer.client.js",
    "~/plugins/vue2-progress-bar.client.js",
    "~/plugins/vue-radial-progress.client.js",
    "~/plugins/k-progress.client.js",
    "~/plugins/vue-browser-geolocation.client.js"
  ],
  build: {
    //vendor:['vue-screen-size']
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
    "cookie-universal-nuxt",
    "nuxt-leaflet",
    "@nuxtjs/auth-next",
    'vue-geolocation-api/nuxt',
   
  ],
 
  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          refresh: { url: "/refresh_token_user", method: "post" },
          logout: false,
          user: { url: "/user", method: "get" },
        },
      },
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "http://65.21.119.84:3066",
  },
  toast: {
    position: "top-right",
    iconPack: "custom-class",
    containerClass: "app-toast",
    duration: 5000,
    register: [
      {
        name: "msgError",
        message: (payload) => payload.message,
        options: {
          type: "error",
          icon: "icon-close",
          className: "app-toast--error",
        },
      },
      {
        name: "msgSuccess",
        message: (payload) => payload.message,
        options: {
          type: "success",
          icon: "icon-close",
          className: "app-toast--success",
        },
      },
    ],
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/scss/_variables.scss"],
    rtl: true,
    treeShake: true,
    lang: {
      locales: { fa },
      current: "fa",
    },
    theme: {
      themes: {
        light: {
          primary: "#152d72",
          secondry: "#da9233",
        },
      },
    },
  },
  // enable PWA
  pwa: {
    manifest: {
      lang: "en",
      name: "2118",
      short_name: "2118",
      display: "standalone",
    },
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },


};
