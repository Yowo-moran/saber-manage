import { defineConfig } from 'vite';
import setupVitePlugins from './vite/plugins';
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: '',//目标 URL
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: setupVitePlugins()
});
