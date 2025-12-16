# 🔐 GitHub Secrets 配置指南

## 问题说明

部署后出现错误：`supabaseUrl is required`

**原因**: GitHub Actions 构建时缺少 Supabase 环境变量。

## 🎯 需要配置的 Secrets

从本地 `.env.local` 文件中获取：

1. **VITE_SUPABASE_URL**
   ```
   https://upltwcywmvymlytjmzmm.supabase.co
   ```

2. **VITE_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbHR3Y3l3bXZ5bWx5dGptem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjIyMzcsImV4cCI6MjA4MTQzODIzN30._9ifezBTxC1e4eicJh5FfcyWpHHDXE27EBy4p2_Q7qg
   ```

## 📝 手动配置步骤

### 方式 1: 通过 GitHub 网页配置（推荐）

1. 访问仓库 Settings 页面：
   ```
   https://github.com/cafe9k/VibeCodingDemo/settings/secrets/actions
   ```

2. 点击 **"New repository secret"** 按钮

3. 添加第一个 Secret：
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://upltwcywmvymlytjmzmm.supabase.co`
   - 点击 **"Add secret"**

4. 添加第二个 Secret：
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbHR3Y3l3bXZ5bWx5dGptem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjIyMzcsImV4cCI6MjA4MTQzODIzN30._9ifezBTxC1e4eicJh5FfcyWpHHDXE27EBy4p2_Q7qg`
   - 点击 **"Add secret"**

5. 完成后重新触发部署：
   - 访问: https://github.com/cafe9k/VibeCodingDemo/actions
   - 点击最新的 workflow
   - 点击 **"Re-run all jobs"**

### 方式 2: 使用 GitHub CLI（如果已安装）

```bash
# 配置 SUPABASE_URL
gh secret set VITE_SUPABASE_URL -b "https://upltwcywmvymlytjmzmm.supabase.co" -R cafe9k/VibeCodingDemo

# 配置 SUPABASE_ANON_KEY
gh secret set VITE_SUPABASE_ANON_KEY -b "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbHR3Y3l3bXZ5bWx5dGptem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjIyMzcsImV4cCI6MjA4MTQzODIzN30._9ifezBTxC1e4eicJh5FfcyWpHHDXE27EBy4p2_Q7qg" -R cafe9k/VibeCodingDemo

# 重新触发部署
git commit --allow-empty -m "chore: 触发重新部署"
git push
```

## ✅ 验证配置

配置完成后：

1. 推送代码触发新的部署，或手动重新运行 workflow
2. 等待部署完成（约 2-3 分钟）
3. 访问网站: https://cafe9k.github.io/VibeCodingDemo/
4. 打开浏览器控制台，确认没有 `supabaseUrl is required` 错误

## 🔧 已完成的修改

已经修改了 `.github/workflows/deploy.yml`，添加了环境变量支持：

```yaml
- name: Build
  run: |
    echo "开始构建..."
    npm run build
  env:
    NODE_ENV: production
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## 🔒 安全提示

- ✅ **ANON KEY 是公开密钥**，可以安全地暴露在客户端代码中
- ✅ GitHub Secrets 是加密存储的，只有 Actions 可以访问
- ⚠️ **不要** 将 Service Role Key 添加到客户端代码或 Secrets 中
- ⚠️ 确保 Supabase 的 Row Level Security (RLS) 已正确配置

## 📚 相关文档

- [GitHub Secrets 文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase 客户端配置](https://supabase.com/docs/reference/javascript/initializing)

---

**配置完成后，网站将正常工作！** 🎉

