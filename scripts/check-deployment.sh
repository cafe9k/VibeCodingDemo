#!/bin/bash

# GitHub Pages 部署状态检查脚本

REPO_OWNER="cafe9k"
REPO_NAME="VibeCodingDemo"
GITHUB_PAGES_URL="https://${REPO_OWNER}.github.io/${REPO_NAME}/"

echo "🔍 检查 GitHub Pages 部署状态..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查 GitHub Actions 工作流状态
echo "📊 检查 GitHub Actions 工作流..."
echo "   访问: https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
echo ""

# 检查网站是否可访问
echo "🌐 检查网站可访问性..."
echo "   URL: ${GITHUB_PAGES_URL}"

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${GITHUB_PAGES_URL}" 2>/dev/null)

if [ "$HTTP_STATUS" = "200" ]; then
    echo "   ✅ 网站已成功部署！HTTP 状态: ${HTTP_STATUS}"
    echo ""
    echo "🎉 恭喜！您的网站已经上线："
    echo "   ${GITHUB_PAGES_URL}"
elif [ "$HTTP_STATUS" = "404" ]; then
    echo "   ⏳ 网站尚未部署（HTTP 404）"
    echo ""
    echo "📝 请完成以下步骤："
    echo "   1. 访问: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/pages"
    echo "   2. 在 Source 下拉菜单选择 'GitHub Actions'"
    echo "   3. 点击 Save 保存"
    echo "   4. 等待 2-3 分钟后重新运行此脚本"
else
    echo "   ⚠️  无法访问网站（HTTP ${HTTP_STATUS}）"
    echo ""
    echo "可能的原因："
    echo "   - GitHub Pages 尚未启用"
    echo "   - 部署正在进行中"
    echo "   - 网络连接问题"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 相关链接："
echo "   - 仓库主页: https://github.com/${REPO_OWNER}/${REPO_NAME}"
echo "   - Actions: https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
echo "   - Settings: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/pages"
echo ""

