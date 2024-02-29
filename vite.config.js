import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { analyzer } from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    analyzer({
      openAnalyzer: false,
      analyzerMode: 'server'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
