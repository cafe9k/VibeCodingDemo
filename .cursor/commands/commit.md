---
name: 快速提交代码
description: 一键提交并推送代码到远程仓库（自动添加所有改动）
---

#!/bin/bash

# 快速提交脚本
echo "📝 正在准备提交代码..."
echo ""

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"
echo ""

# 显示当前状态
echo "📊 检查代码改动..."
git status --short
echo ""

# 检查是否有改动
if [[ -z $(git status --short) ]]; then
    echo "✅ 工作区干净，无需提交"
    exit 0
fi

# 显示详细改动
echo "📋 详细改动如下："
echo "----------------------------------------"
git status
echo "----------------------------------------"
echo ""

# 添加所有改动
echo "➕ 添加所有改动到暂存区..."
git add -A
echo "✅ 已添加所有改动"
echo ""

# 提示输入提交信息
echo "💬 请输入提交信息 (格式: type: message)"
echo "   提交类型参考："
echo "   - feat: 新功能"
echo "   - fix: 修复 Bug"
echo "   - docs: 文档更新"
echo "   - style: 代码格式调整"
echo "   - refactor: 代码重构"
echo "   - perf: 性能优化"
echo "   - test: 测试相关"
echo "   - chore: 构建/工具链更新"
echo ""
read -p "提交信息: " COMMIT_MSG

# 检查是否输入了提交信息
if [[ -z "$COMMIT_MSG" ]]; then
    echo "❌ 提交信息不能为空"
    exit 1
fi

# 提交代码
echo ""
echo "💾 正在提交代码..."
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo "✅ 提交成功"
    echo ""
    
    # 询问是否推送
    read -p "🚀 是否推送到远程仓库? (y/n): " PUSH_CONFIRM
    
    if [[ "$PUSH_CONFIRM" == "y" || "$PUSH_CONFIRM" == "Y" ]]; then
        echo "📤 正在推送到 origin/$CURRENT_BRANCH..."
        git push origin $CURRENT_BRANCH
        
        if [ $? -eq 0 ]; then
            echo "✅ 推送成功！"
            echo ""
            echo "📊 最近的提交记录："
            git log --oneline -5
        else
            echo "❌ 推送失败"
            exit 1
        fi
    else
        echo "⏸️  已跳过推送，代码仅提交到本地"
        echo ""
        echo "💡 如需推送，请运行: git push origin $CURRENT_BRANCH"
    fi
else
    echo "❌ 提交失败"
    exit 1
fi

echo ""
echo "🎉 完成！"

