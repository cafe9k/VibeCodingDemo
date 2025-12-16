# GitHub Pages 部署指南

本文档详细说明如何将 VibeCodingDemo 项目部署到 GitHub Pages。

## 📋 前置要求

1. GitHub 账号
2. 已安装 Git
3. 已安装 Node.js (v18+)
4. 项目代码已推送到 GitHub 仓库

## 🚀 自动部署（推荐）

项目已配置 GitHub Actions，可以实现自动部署。

### 步骤 1: 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/VibeCodingDemo.git

# 添加所有文件
git add .

# 提交
git commit -m "feat: 配置 GitHub Pages 自动部署"

# 推送到 main 分支
git push -u origin main
```

### 步骤 2: 启用 GitHub Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单中选择 **GitHub Actions**
5. 保存设置

### 步骤 3: 触发部署

部署会在以下情况自动触发：
- 每次推送代码到 `main` 分支
- 手动在 Actions 页面触发工作流

### 步骤 4: 查看部署状态

1. 打开 GitHub 仓库的 **Actions** 标签页
2. 查看最新的工作流运行状态
3. 部署成功后，访问：`https://你的用户名.github.io/VibeCodingDemo/`

## 🛠️ 手动部署（可选）

如果需要手动部署，可以使用 gh-pages 包：

### 安装依赖

```bash
npm install --save-dev gh-pages
```

### 执行部署

```bash
npm run deploy
```

## ⚙️ 配置说明

### 1. Vite 配置 (`vite.config.js`)

```javascript
export default defineConfig({
  // 根据环境设置 base 路径
  base: process.env.NODE_ENV === 'production' ? '/VibeCodingDemo/' : '/',
  // ...其他配置
})
```

**重要**: `base` 必须与你的 GitHub 仓库名称一致（带前后斜杠）。

### 2. GitHub Actions 工作流 (`.github/workflows/deploy.yml`)

工作流包含两个主要任务：

1. **Build**: 构建项目并生成静态文件
2. **Deploy**: 将构建产物部署到 GitHub Pages

### 3. 路由配置

由于 GitHub Pages 是静态托管，需要处理 SPA 路由：

在 `public/404.html` 中已配置重定向逻辑，确保前端路由正常工作。

## 🔍 常见问题

### 1. 页面显示 404

**原因**: `base` 路径配置不正确

**解决方案**:
- 确保 `vite.config.js` 中的 `base` 设置为 `/仓库名/`
- 如果仓库名不是 `VibeCodingDemo`，需要修改配置

### 2. 样式和资源加载失败

**原因**: 资源路径不正确

**解决方案**:
- 确保所有资源引用使用相对路径
- 检查 `base` 配置是否正确

### 3. 部署失败

**原因**: 权限或配置问题

**解决方案**:
1. 检查 GitHub Actions 权限设置
2. 确保在 Settings > Pages 中选择了 "GitHub Actions" 作为部署源
3. 查看 Actions 日志获取详细错误信息

### 4. 环境变量未生效

**原因**: GitHub Pages 是静态托管，不支持服务器端环境变量

**解决方案**:
- 对于 Supabase 等配置，使用 GitHub Secrets：
  1. 进入仓库 Settings > Secrets and variables > Actions
  2. 添加 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
  3. 在 `.github/workflows/deploy.yml` 中的 build 步骤添加 env 配置：

```yaml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## 📝 部署清单

部署前请确认：

- [ ] 代码已提交到 GitHub
- [ ] `vite.config.js` 中的 `base` 配置正确
- [ ] GitHub Pages 设置为 "GitHub Actions" 模式
- [ ] 必要的环境变量已配置（如果需要）
- [ ] `.github/workflows/deploy.yml` 文件存在且配置正确

## 🔗 相关链接

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 运行日志
2. 检查浏览器控制台错误
3. 参考上述常见问题解决方案
4. 查阅 GitHub Pages 和 Vite 官方文档

---

**提示**: 首次部署可能需要几分钟才能生效，请耐心等待。

