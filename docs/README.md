# 携程旅行 MVP - 多模块预订平台

这是一个仿携程旅行网站的MVP项目，包含机票、酒店、火车票预订功能。

## 技术栈

- **前端**: React 18 + Vite
- **UI**: TailwindCSS + DaisyUI
- **路由**: React Router v6
- **状态管理**: Zustand
- **数据请求**: React Query
- **后端**: Supabase (PostgreSQL + Authentication)
- **部署**: GitHub Pages

## 功能特性

### ✈️ 机票模块
- 搜索国内航班
- 按价格/时间筛选排序
- 查看航班详情
- 填写乘客信息下单

### 🏨 酒店模块
- 搜索城市酒店
- 浏览酒店列表和详情
- 选择房型和入住天数
- 在线预订

### 🚄 火车票模块
- 搜索火车车次
- 查看不同座位类型和价格
- 填写乘客信息购票

### 👤 用户系统
- 邮箱注册/登录
- 个人中心
- 订单管理
- 模拟支付流程

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd VibeCodingDemo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL Editor 中运行 `supabase/migrations/001_initial_schema.sql` 创建数据表
3. 运行 `supabase/seed.sql` 导入示例数据
4. 在 Authentication > Settings 中启用 Email provider

### 4. 配置环境变量

创建 `.env.local` 文件：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

## 部署到 GitHub Pages

### 1. 配置 GitHub Secrets

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. 启用 GitHub Pages

在 Settings > Pages 中：
- Source: GitHub Actions

### 3. 推送代码

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

GitHub Actions 会自动构建并部署到 GitHub Pages。

## 项目结构

```
VibeCodingDemo/
├── src/
│   ├── components/       # 通用组件
│   ├── pages/           # 页面组件
│   ├── services/        # API 服务
│   ├── store/           # 状态管理
│   ├── utils/           # 工具函数
│   ├── App.jsx
│   └── main.jsx
├── public/
├── supabase/            # 数据库迁移和种子数据
├── .github/workflows/   # GitHub Actions 配置
└── package.json
```

## 数据库架构

### flights (航班)
- 航班号、航空公司
- 出发/到达城市和机场
- 起飞/降落时间
- 价格和可用座位

### hotels (酒店)
- 酒店名称、地址
- 星级评分
- 设施和描述

### hotel_rooms (房型)
- 关联酒店
- 房型类型和价格
- 最大入住人数

### trains (火车票)
- 车次号和类型
- 出发/到达站
- 时刻表和座位信息

### orders (订单)
- 关联用户
- 订单类型和数据
- 状态和总价

## 注意事项

1. 这是一个 MVP 演示项目，不适合生产环境
2. 使用模拟数据，无真实支付功能
3. Supabase 免费版有使用限制
4. GitHub Pages 仅支持静态资源托管

## 许可证

MIT License

## 作者

VibeCoding Demo Project
