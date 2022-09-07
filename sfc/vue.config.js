module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app'
    : '',
  pages: {
    index: {
      title: 'Exploring the world of VueJS',
      entry: './src/main.js'
    },
    landing: {
      title: 'Landing Page',
      entry: './src/landing.js'
    }
  }
}