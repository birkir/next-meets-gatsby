const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const express = require('express');
const bootstrap = require('./lib/gatsby');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const next = require('next')({ dev });
const handle = next.getRequestHandler();

const program = {
  directory: path.resolve(path.join(__dirname, '.')),
  sitePackageJson: require('./package.json'),
  prefixPaths: false,
  noUglify: true,
  openTracingConfigFile: '',
};

next.prepare()
.then(() => bootstrap(program))
.then(({ schema }) => {

  const app = express();
  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app });

  app.get('/post/:id', (req, res) =>
    next.render(req, res, '/post', req.params));

  app.get('*', (req, res) => handle(req, res));

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});
