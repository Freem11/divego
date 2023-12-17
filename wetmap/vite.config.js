import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
    https: {
      key: "/Users/matthewfreeman/key.pem",
      cert: "/Users/matthewfreeman/cert.pem",
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
});
