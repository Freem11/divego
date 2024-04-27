import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
    https: {
      key: "/Users/kadav/Downloads/key.pem",
      cert: "/Users/kadav/Downloads/cert.pem",
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
});
