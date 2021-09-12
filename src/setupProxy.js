const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/ws/1.1", {
      target: "https://api.musixmatch.com",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/2.0", {
      target: "http://ws.audioscrobbler.com",
      changeOrigin: true,
    })
  );
};
