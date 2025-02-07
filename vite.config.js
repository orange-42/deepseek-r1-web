import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend(), tailwindcss()],
  resolve: {
    alias: {
       // 设置 `@` 为 `src` 目录的别名
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    host: '0.0.0.0'
  },
  base: './'
})
