import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

export default function (app: { use: (arg0: string[], arg1: RequestHandler) => void; }): void {
  app.use(
    ["/api", "auth", "/images", "/socket.io", "/sockjs-node/"],
    createProxyMiddleware({
      target: "http://localhost:5555/",
      ws: true,
      changeOrigin: true,
    })
  );
};
