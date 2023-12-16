import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
    https: {
      key: process.env.VITE_SSL_KEY_FILE,
      cert: process.env.VITE_SSL_CRT_FILE,
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
});
