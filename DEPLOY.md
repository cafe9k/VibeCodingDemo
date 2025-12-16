# 🚀 快速部署到 GitHub Pages

## 一键部署步骤

### 1️⃣ 确认配置

检查 `vite.config.js` 中的仓库名称是否正确：

```javascript
base: process.env.NODE_ENV === 'production' ? '/VibeCodingDemo/' : '/',
```

**重要**: 将 `/VibeCodingDemo/` 替换为你的实际仓库名（如果不同）。

### 2️⃣ 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/VibeCodingDemo.git

# 添加所有文件
git add .

# 提交
git commit -m "feat: 配置 GitHub Pages 自动部署"

# 推送到 main 分支
git push -u origin main
```

### 3️⃣ 启用 GitHub Pages

1. 打开 GitHub 仓库页面
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单选择 **GitHub Actions**
5. 保存

### 4️⃣ 等待部署完成

- 进入仓库的 **Actions** 标签页
- 查看工作流运行状态
- 大约 2-3 分钟后完成

### 5️⃣ 访问网站

部署完成后，访问：

```
https://你的用户名.github.io/VibeCodingDemo/
```

## 🔧 配置 Supabase（可选）

如果需要数据库功能，需要配置环境变量：

1. 进入 GitHub 仓库 **Settings > Secrets and variables > Actions**
2. 点击 **New repository secret**
3. 添加以下密钥：
   - `VITE_SUPABASE_URL`: 你的 Supabase 项目 URL
   - `VITE_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

4. 更新 `.github/workflows/deploy.yml` 的 build 步骤：

```yaml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

5. 重新推送代码触发部署

## ✅ 部署检查清单

- [ ] `vite.config.js` 中的 `base` 配置正确
- [ ] 代码已推送到 GitHub
- [ ] GitHub Pages 设置为 "GitHub Actions" 模式
- [ ] Actions 工作流运行成功
- [ ] 可以正常访问部署的网站

## 🔄 更新网站

每次修改代码后：

```bash
git add .
git commit -m "你的提交信息"
git push
```

推送后会自动触发重新部署。

## 📖 详细文档

查看完整部署文档: [docs/GITHUB_PAGES_DEPLOY.md](docs/GITHUB_PAGES_DEPLOY.md)

## ❓ 遇到问题？

### 页面显示 404

检查 `vite.config.js` 中的 `base` 路径是否与仓库名一致。

### 样式加载失败

确保资源路径使用相对路径，检查 `base` 配置。

### 部署失败

1. 查看 Actions 日志
2. 确认 Node.js 版本兼容（推荐 18+）
3. 检查 `package.json` 中的依赖

---

**提示**: 首次部署可能需要几分钟，请耐心等待 ⏰

