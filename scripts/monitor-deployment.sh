#!/bin/bash

# GitHub Pages 部署实时监控脚本

REPO_OWNER="cafe9k"
REPO_NAME="VibeCodingDemo"
GITHUB_TOKEN="${1:-$GITHUB_TOKEN}"
PAGES_URL="https://${REPO_OWNER}.github.io/${REPO_NAME}/"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ 请提供 GITHUB_TOKEN"
    echo "用法: $0 <token>"
    exit 1
fi

echo "🔄 监控 GitHub Pages 部署状态..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

MAX_CHECKS=60  # 最多检查 60 次（约 5 分钟）
CHECK_INTERVAL=5  # 每 5 秒检查一次
CHECKS=0

while [ $CHECKS -lt $MAX_CHECKS ]; do
    CHECKS=$((CHECKS + 1))
    
    # 获取最新的工作流运行状态
    RESPONSE=$(curl -s -X GET \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=1")
    
    STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    CONCLUSION=$(echo "$RESPONSE" | grep -o '"conclusion":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    CURRENT_TIME=$(date "+%H:%M:%S")
    
    if [ "$STATUS" = "completed" ]; then
        if [ "$CONCLUSION" = "success" ]; then
            echo "[$CURRENT_TIME] ✅ 部署成功完成！"
            echo ""
            
            # 检查网站是否可访问
            echo "🌐 检查网站可访问性..."
            sleep 3
            
            HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${PAGES_URL}" 2>/dev/null)
            
            if [ "$HTTP_STATUS" = "200" ]; then
                echo "✅ 网站已上线！"
                echo ""
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                echo "🎉 部署完全成功！"
                echo ""
                echo "📍 访问您的网站："
                echo "   ${PAGES_URL}"
                echo ""
                echo "📊 查看详情："
                echo "   https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                exit 0
            else
                echo "⏳ 网站正在生效中... (HTTP ${HTTP_STATUS})"
                echo "   请等待几分钟后访问"
                echo ""
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                echo "✅ 部署完成！"
                echo ""
                echo "📍 您的网站地址："
                echo "   ${PAGES_URL}"
                echo ""
                echo "💡 提示: 如果现在访问显示 404，请等待 1-2 分钟后刷新"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                exit 0
            fi
        else
            echo "[$CURRENT_TIME] ❌ 部署失败 (conclusion: $CONCLUSION)"
            echo ""
            echo "查看详细日志:"
            echo "   https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
            exit 1
        fi
    elif [ "$STATUS" = "in_progress" ] || [ "$STATUS" = "queued" ]; then
        echo "[$CURRENT_TIME] ⏳ 部署进行中... ($STATUS)"
    else
        echo "[$CURRENT_TIME] ⚠️  未知状态: $STATUS"
    fi
    
    if [ $CHECKS -lt $MAX_CHECKS ]; then
        sleep $CHECK_INTERVAL
    fi
done

echo ""
echo "⏰ 监控超时（5 分钟）"
echo ""
echo "请手动检查部署状态:"
echo "   https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
exit 1

