const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
<<<<<<< Updated upstream
      target: 'http://localhost:8800',
=======
      target: "http://localhost:8800",
>>>>>>> Stashed changes
      changeOrigin: true,
    }),
  )
}
