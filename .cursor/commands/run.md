---
name: 启动项目
description: 一键启动 VibeCodingDemo 开发服务器（自动处理端口占用）
---

#!/bin/bash

# 快速启动脚本
echo "🚀 正在启动 VibeCodingDemo 项目..."

# 检查并杀死占用 5173 端口的进程
PORT=5173
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
    echo "⚠️  端口 $PORT 已被占用 (PID: $PID)，正在终止..."
    kill -9 $PID
    sleep 1
    echo "✅ 端口已释放"
fi

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi

# 启动开发服务器
echo "🌟 正在启动开发服务器 (端口: $PORT)..."
echo "📍 本地访问: http://localhost:$PORT"
echo "📍 域名访问: http://test.ctripcorp.com:$PORT"
npm run dev

