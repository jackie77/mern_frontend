import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "",
  server: {
    proxy: {
      "/api": {
        target: "https://mern-backend-wknc.onrender.com/api",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("proxyReq Sending Request to the Target:", req.method, req.url, _res);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "proxyRes Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
