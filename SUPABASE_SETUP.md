# Supabase 设置指南

本文档将指导你如何设置 Supabase 后端服务。

## 第一步：创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 使用 GitHub 账号登录（或注册新账号）
3. 点击 "New Project" 创建新项目
4. 填写项目信息：
   - **Project Name**: VibeCodingDemo（或任意名称）
   - **Database Password**: 设置一个强密码（请妥善保存）
   - **Region**: 选择最近的区域（建议选择 Northeast Asia (Tokyo) 或 Southeast Asia (Singapore)）
5. 点击 "Create new project" 并等待项目初始化完成（约1-2分钟）

## 第二步：创建数据库表结构

1. 在 Supabase 项目面板左侧，点击 **SQL Editor**
2. 点击 "+ New query" 创建新查询
3. 复制 `supabase/migrations/001_initial_schema.sql` 文件的全部内容
4. 粘贴到 SQL 编辑器中
5. 点击右下角的 "Run" 按钮执行SQL
6. 如果成功，会显示 "Success. No rows returned"

## 第三步：导入示例数据

1. 在 SQL Editor 中，点击 "+ New query" 创建新查询
2. 复制 `supabase/seed.sql` 文件的全部内容
3. 粘贴到 SQL 编辑器中
4. 点击 "Run" 按钮执行SQL
5. 验证数据是否导入成功：
   - 左侧点击 **Table Editor**
   - 查看 `flights`、`hotels`、`trains` 表中是否有数据

## 第四步：配置认证

1. 左侧点击 **Authentication** > **Providers**
2. 找到 "Email" provider
3. 确保 **Enable Email provider** 开关已打开
4. 配置邮箱设置（可选）：
   - **Enable email confirmations**: 开启后用户注册需要邮箱验证
   - 对于开发测试，建议暂时关闭以简化流程
5. 点击 "Save" 保存设置

## 第五步：获取 API 密钥

1. 左侧点击 **Settings** > **API**
2. 你会看到两个重要的值：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public**: 公开的匿名密钥（很长的字符串）
3. 复制这两个值，你需要在项目中使用它们

## 第六步：配置本地环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容（替换为你的实际值）：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. 保存文件

## 第七步：验证设置

1. 启动开发服务器：

```bash
npm run dev
```

2. 在浏览器中访问 http://localhost:5173
3. 测试以下功能：
   - 注册新用户账号
   - 登录账号
   - 搜索航班/酒店/火车票
   - 创建订单
   - 查看订单列表

## 可选：生成更多模拟数据

如果你想要更多测试数据，可以使用提供的数据生成脚本：

1. 打开 `src/services/mockData.js`
2. 在浏览器控制台或 Node.js 环境中运行数据生成函数
3. 将生成的 SQL 复制到 Supabase SQL Editor 中执行

例如：

```javascript
import { generateAllMockData } from './src/services/mockData.js'

console.log(generateAllMockData())
```

## 部署到 GitHub Pages

### 配置 GitHub Secrets

1. 在 GitHub 仓库页面，点击 **Settings**
2. 左侧菜单选择 **Secrets and variables** > **Actions**
3. 点击 "New repository secret" 添加以下secrets：

**Secret 1:**
- Name: `VITE_SUPABASE_URL`
- Value: 你的 Supabase Project URL

**Secret 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: 你的 Supabase Anon Key

### 启用 GitHub Pages

1. 在仓库 Settings 中，点击左侧 **Pages**
2. **Source** 选择: `GitHub Actions`
3. 保存设置

### 部署

1. 推送代码到 main 分支：

```bash
git add .
git commit -m "feat: 完成携程MVP项目"
git push origin main
```

2. GitHub Actions 会自动触发构建和部署
3. 在 Actions 标签页可以查看部署进度
4. 部署完成后，你的网站将发布到：
   `https://your-username.github.io/VibeCodingDemo/`

## 常见问题

### Q: 数据库表创建失败
A: 检查是否有语法错误，或者尝试逐个表创建（分段执行SQL）

### Q: 用户注册后无法登录
A: 检查 Authentication 设置中是否启用了邮箱验证，如果启用了，你需要点击验证邮件中的链接

### Q: API 调用失败
A: 检查 `.env.local` 文件是否正确配置，并确保已重启开发服务器

### Q: RLS (Row Level Security) 策略报错
A: 确保已经在 SQL 中正确执行了所有 RLS 策略的创建语句

### Q: GitHub Pages 部署后 404
A: 检查 `vite.config.js` 中的 `base` 路径是否与仓库名称一致

## 数据库表说明

### flights (航班表)
存储航班信息，包括航班号、航空公司、出发地、目的地、时间、价格等。

### hotels (酒店表)
存储酒店基本信息，包括名称、地址、星级、评分、设施等。

### hotel_rooms (房型表)
存储酒店房型信息，与酒店表关联，包括房型名称、价格、可住人数等。

### trains (火车票表)
存储火车车次信息，包括车次号、类型、车站、时刻、座位信息等。

### orders (订单表)
存储用户订单，包括订单类型、订单数据、状态、价格等。与 auth.users 表关联。

## 安全提示

1. ⚠️ **不要将 `.env.local` 文件提交到 Git**
2. ⚠️ **不要在客户端代码中使用 service_role key**（仅使用 anon key）
3. ⚠️ **启用 RLS 策略确保数据安全**
4. ⚠️ **定期更新密钥**

## 技术支持

如果遇到问题，可以：
1. 查看 [Supabase 官方文档](https://supabase.com/docs)
2. 访问 [Supabase Discord 社区](https://discord.supabase.com)
3. 检查浏览器控制台的错误信息

祝你使用愉快！🎉

