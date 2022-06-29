const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "auth", "/images", "/socket.io", "/sockjs-node/"],
    createProxyMiddleware({
      target: "http://localhost:5555/",
      ws: true,
      changeOrigin: true,
    })
  );
};
