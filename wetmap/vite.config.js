import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000/',
    },
    https: {
      key:  '../../key.pem',
      cert: '../../cert.pem',
    },
  },
    test: /\.(ttf)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: './fonts/[name].[ext]'
        },
    },],
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
});
