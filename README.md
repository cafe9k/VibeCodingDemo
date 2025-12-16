# 携程旅行 MVP - 多模块预订平台

这是一个仿携程旅行网站的MVP项目，包含机票、酒店、火车票预订功能。

## 技术栈

- **前端**: React 18 + Vite + TailwindCSS + DaisyUI
- **状态管理**: Zustand + React Query
- **后端**: Supabase (PostgreSQL + Authentication)
- **部署**: GitHub Pages

## 功能特性

- ✈️ **机票预订**: 搜索航班、查看详情、在线下单
- 🏨 **酒店预订**: 浏览酒店、选择房型、预订入住
- 🚄 **火车票**: 搜索车次、选择座位、购票
- 👤 **用户系统**: 注册登录、个人中心、订单管理

## 快速开始

### 🚀 一键启动（推荐）

在 Cursor 编辑器的 chatbox 中输入：

```
/run
```

该命令会自动检查端口占用、安装依赖并启动开发服务器。

### 📝 手动启动

```bash
# 安装依赖
npm install

# 配置环境变量（创建 .env.local）
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 运行开发服务器
npm run dev
```

访问 http://localhost:5173

## 📚 文档

详细文档请查看 `docs/` 目录：

- [完整 README](docs/README.md) - 详细的项目说明和配置指南
- [Supabase 配置指南](docs/SUPABASE_SETUP.md) - 数据库设置和配置步骤
- [使用说明](docs/USAGE.md) - 功能使用和操作指南
- [项目总结](docs/PROJECT_SUMMARY.md) - 项目架构和技术细节

## 项目结构

```
VibeCodingDemo/
├── src/              # 源代码
│   ├── components/   # 通用组件
│   ├── pages/        # 页面组件
│   ├── services/     # API 服务
│   ├── store/        # 状态管理
│   └── utils/        # 工具函数
├── supabase/         # 数据库迁移和种子数据
├── docs/             # 项目文档
└── public/           # 静态资源
```

## 注意事项

1. 这是一个 MVP 演示项目，不适合生产环境使用
2. 使用模拟数据，无真实支付功能
3. Supabase 免费版有使用限制

## 许可证

MIT License
