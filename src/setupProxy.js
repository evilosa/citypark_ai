const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/api/v1', { target: 'http://localhost:4000' }));
  app.use(proxy('/uploads', { target: 'http://localhost:4000' }));
  app.use(proxy('/onec', { target: 'http://85.172.104.69:8080', pathRewrite: {'^/onec' : ''} }));
};