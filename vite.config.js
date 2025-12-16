import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时，base 需要设置为仓库名
  // 本地开发使用 '/'，生产环境使用 '/仓库名/'
  base: process.env.NODE_ENV === 'production' ? '/VibeCodingDemo/' : '/',
  // 确保环境变量被正确注入到客户端代码
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  },
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

