module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  modules: [
  ],

  css: [
    {
      src: '~/assets/css/main.scss',
      lang: 'scss'
    },
    {
      src: '@fortawesome/fontawesome-free/scss/fontawesome.scss',
      lang: 'scss'
    },
    '@fortawesome/fontawesome-free/scss/solid.scss',
    '@fortawesome/fontawesome-free/scss/regular.scss'
  ],

  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.push({
        test: /\.vue$/,
        loader: 'iview-loader',
        options: {
          prefix: false
        }
      })
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  plugins: [
    {src: '~/plugins/iview.js', ssr: true}, 
    {src: '~/plugins/infinite-scroll.js', ssr: false}
  ]
}

