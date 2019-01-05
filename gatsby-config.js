module.exports = {
  siteMetadata: {
    title: 'DEMO',
  },
  plugins: [{
    resolve: 'gatsby-source-medium',
    options: {
      username: '@birkir.gudjonsson',
      limit: 10
    }
  }]
};
