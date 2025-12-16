# ⚡ GitHub Pages 一键配置指南

## ✅ 已完成的自动化配置

您的项目已经完成以下自动化配置：

- ✅ 代码已推送到 GitHub: `https://github.com/cafe9k/VibeCodingDemo`
- ✅ GitHub Actions 工作流已配置
- ✅ Vite 配置已优化
- ✅ SPA 路由支持已添加

## 🎯 只需 2 分钟完成最后配置！

### 方式一：使用自动化脚本（推荐）

#### 步骤 1: 获取 GitHub Token

1. 访问: https://github.com/settings/tokens/new
2. 填写信息：
   - **Note**: `GitHub Pages Setup`
   - **Expiration**: 选择 `7 days`
   - **Select scopes**: 勾选 `repo` 和 `workflow`
3. 点击 `Generate token`
4. **复制生成的 token**（只显示一次！）

#### 步骤 2: 运行自动配置脚本

```bash
# 设置 token（替换为你的实际 token）
export GITHUB_TOKEN='ghp_你的token'

# 运行自动配置脚本
./scripts/auto-setup-pages.sh

# 检查部署状态
./scripts/check-deployment.sh
```

### 方式二：手动配置（3 步搞定）

如果不想使用脚本，可以手动配置：

#### 步骤 1: 打开 GitHub Pages 设置

在浏览器中打开:
```
https://github.com/cafe9k/VibeCodingDemo/settings/pages
```

#### 步骤 2: 选择部署源

在页面中找到 **"Build and deployment"** 部分：

1. **Source** 下拉菜单选择 **`GitHub Actions`**
2. 页面会自动保存（无需点击 Save 按钮）

#### 步骤 3: 查看部署状态

打开 Actions 页面:
```
https://github.com/cafe9k/VibeCodingDemo/actions
```

等待绿色的 ✅ 出现（约 2-3 分钟）

## 🌐 访问您的网站

配置完成后，您的网站将在以下地址可用：

```
https://cafe9k.github.io/VibeCodingDemo/
```

## 🔍 验证部署

### 方法 1: 使用检查脚本

```bash
./scripts/check-deployment.sh
```

### 方法 2: 手动访问

在浏览器中打开您的网站 URL，检查：
- ✓ 首页正常显示
- ✓ 导航链接工作
- ✓ 样式加载正确
- ✓ 图片显示正常

## 📊 常用链接

| 功能 | 链接 |
|------|------|
| 🏠 仓库主页 | https://github.com/cafe9k/VibeCodingDemo |
| ⚙️ Pages 设置 | https://github.com/cafe9k/VibeCodingDemo/settings/pages |
| 🔄 Actions 状态 | https://github.com/cafe9k/VibeCodingDemo/actions |
| 🌐 网站地址 | https://cafe9k.github.io/VibeCodingDemo/ |

## 🔄 后续更新流程

配置完成后，每次修改代码只需：

```bash
git add .
git commit -m "你的提交信息"
git push
```

推送后会自动触发部署，2-3 分钟后生效。

## ❓ 遇到问题？

### 问题 1: Token 权限不足

**解决**: 确保 token 有 `repo` 和 `workflow` 权限

### 问题 2: 404 错误

**解决**: 
1. 确认 Settings > Pages 中选择了 "GitHub Actions"
2. 等待 Actions 完成部署
3. 清除浏览器缓存

### 问题 3: 样式加载失败

**解决**: 
1. 检查 `vite.config.js` 中的 `base` 配置
2. 确保为 `/VibeCodingDemo/`

### 问题 4: 部署失败

**解决**:
1. 查看 Actions 日志获取详细错误
2. 检查 `.github/workflows/deploy.yml` 配置

## 📚 详细文档

如需更多帮助，请查看：

- [完整部署指南](docs/GITHUB_PAGES_DEPLOY.md)
- [部署清单](docs/DEPLOYMENT_CHECKLIST.md)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)

---

**🎊 预计完成时间: 2 分钟**

选择方式一或方式二，现在就开始配置吧！

