import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时，base 需要设置为仓库名
  // 本地开发使用 '/'，生产环境使用 '/仓库名/'
  base: process.env.NODE_ENV === 'production' ? '/VibeCodingDemo/' : '/',
  // Vite 会自动从 .env.local 加载 VITE_ 开头的环境变量
  // 生产构建时通过 GitHub Actions 的 env 注入
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
    strictPort: false, // 端口被占用时自动尝试下一个可用端口
    open: false, // 不自动打开浏览器
    allowedHosts: [
      'test.ctripcorp.com',
      '.ctripcorp.com', // 允许所有 ctripcorp.com 子域名
    ],
  },
  build: {
    outDir: 'dist'
  }
})

