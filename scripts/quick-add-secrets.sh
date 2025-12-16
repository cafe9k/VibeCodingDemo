#!/bin/bash

# 快速添加 GitHub Secrets 脚本
# 
# 使用方法：
# 1. 安装 GitHub CLI: brew install gh
# 2. 登录 GitHub: gh auth login
# 3. 运行此脚本: ./scripts/quick-add-secrets.sh

echo "🔐 开始配置 GitHub Secrets..."
echo ""

# 检查 gh 是否安装
if ! command -v gh &> /dev/null; then
    echo "❌ 未找到 GitHub CLI (gh)"
    echo ""
    echo "请先安装 GitHub CLI:"
    echo "  brew install gh"
    echo ""
    echo "然后登录:"
    echo "  gh auth login"
    echo ""
    exit 1
fi

# 检查是否已登录
if ! gh auth status &> /dev/null; then
    echo "❌ GitHub CLI 未登录"
    echo ""
    echo "请先登录:"
    echo "  gh auth login"
    echo ""
    exit 1
fi

# 配置 Secrets
echo "📝 添加 VITE_SUPABASE_URL..."
echo "https://upltwcywmvymlytjmzmm.supabase.co" | gh secret set VITE_SUPABASE_URL -R cafe9k/VibeCodingDemo

echo "📝 添加 VITE_SUPABASE_ANON_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbHR3Y3l3bXZ5bWx5dGptem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjIyMzcsImV4cCI6MjA4MTQzODIzN30._9ifezBTxC1e4eicJh5FfcyWpHHDXE27EBy4p2_Q7qg" | gh secret set VITE_SUPABASE_ANON_KEY -R cafe9k/VibeCodingDemo

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GitHub Secrets 配置成功！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "现在推送代码触发重新部署:"
echo "  git push"
echo ""

