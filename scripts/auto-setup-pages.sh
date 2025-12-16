#!/bin/bash

# GitHub Pages 自动配置脚本
# 使用 GitHub API 自动启用 GitHub Pages

set -e

REPO_OWNER="cafe9k"
REPO_NAME="VibeCodingDemo"

echo "🚀 GitHub Pages 自动配置脚本"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "仓库: ${REPO_OWNER}/${REPO_NAME}"
echo ""

# 检查是否有 GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  未找到 GITHUB_TOKEN 环境变量"
    echo ""
    echo "请按照以下步骤获取 Personal Access Token:"
    echo ""
    echo "1. 访问: https://github.com/settings/tokens/new"
    echo "2. 设置 Token 名称: 'GitHub Pages Setup'"
    echo "3. 设置过期时间: 选择 '7 days' (或更短)"
    echo "4. 选择权限:"
    echo "   ✓ repo (所有仓库权限)"
    echo "   ✓ workflow (工作流权限)"
    echo "5. 点击 'Generate token'"
    echo "6. 复制生成的 token"
    echo ""
    echo "然后运行:"
    echo "  export GITHUB_TOKEN='你的token'"
    echo "  ./scripts/auto-setup-pages.sh"
    echo ""
    exit 1
fi

echo "✓ 找到 GITHUB_TOKEN"
echo ""

# 配置 GitHub Pages
echo "📝 配置 GitHub Pages..."

# 使用 GitHub Actions 作为部署源
API_URL="https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pages"

RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -d '{
        "source": {
            "branch": "main",
            "path": "/"
        },
        "build_type": "workflow"
    }' 2>&1)

# 检查响应
if echo "$RESPONSE" | grep -q "html_url"; then
    echo "✅ GitHub Pages 配置成功！"
    echo ""
    
    # 提取 Pages URL
    PAGES_URL=$(echo "$RESPONSE" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
    echo "🌐 您的网站地址: $PAGES_URL"
    echo ""
    
    echo "⏳ 等待部署完成..."
    echo "   这可能需要 2-3 分钟"
    echo ""
    echo "查看部署进度:"
    echo "   https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
    
elif echo "$RESPONSE" | grep -q "already exists"; then
    echo "ℹ️  GitHub Pages 已经配置过了"
    echo ""
    
    # 获取当前配置
    CURRENT_CONFIG=$(curl -s -X GET "$API_URL" \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "X-GitHub-Api-Version: 2022-11-28")
    
    if echo "$CURRENT_CONFIG" | grep -q "html_url"; then
        PAGES_URL=$(echo "$CURRENT_CONFIG" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
        echo "🌐 您的网站地址: $PAGES_URL"
    fi
    
    echo ""
    echo "✓ 无需额外配置"
else
    echo "❌ 配置失败"
    echo ""
    echo "错误信息:"
    echo "$RESPONSE"
    echo ""
    echo "请手动配置:"
    echo "1. 访问: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/pages"
    echo "2. 在 Source 下拉菜单选择 'GitHub Actions'"
    echo "3. 保存"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ 配置完成！"
echo ""
echo "下一步:"
echo "  - 等待 GitHub Actions 完成部署"
echo "  - 运行 './scripts/check-deployment.sh' 检查部署状态"
echo ""

