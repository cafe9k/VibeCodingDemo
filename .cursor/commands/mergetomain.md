---
name: 合并到 main 分支
description: 将当前分支合并到 main 分支并推送，触发 GitHub Actions 部署
---

#!/bin/bash

# 合并到 main 分支脚本
echo "🔀 准备将当前分支合并到 main 分支..."
echo ""

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"

# 检查是否已经在 main 分支
if [[ "$CURRENT_BRANCH" == "main" ]]; then
    echo "⚠️  已经在 main 分支上，无需合并"
    exit 0
fi

echo ""

# 检查工作区状态
if [[ -n $(git status --short) ]]; then
    echo "⚠️  工作区有未提交的改动，请先提交或暂存"
    echo ""
    git status
    echo ""
    read -p "是否自动提交当前改动? (y/n): " AUTO_COMMIT
    
    if [[ "$AUTO_COMMIT" == "y" || "$AUTO_COMMIT" == "Y" ]]; then
        echo ""
        read -p "请输入提交信息: " COMMIT_MSG
        
        if [[ -z "$COMMIT_MSG" ]]; then
            echo "❌ 提交信息不能为空"
            exit 1
        fi
        
        git add -A
        git commit -m "$COMMIT_MSG"
        git push origin $CURRENT_BRANCH
        echo "✅ 当前分支改动已提交并推送"
        echo ""
    else
        echo "❌ 请先提交改动后再执行合并"
        exit 1
    fi
fi

# 确认合并操作
echo "⚠️  即将执行以下操作："
echo "   1. 切换到 main 分支"
echo "   2. 从远程拉取最新代码"
echo "   3. 合并 $CURRENT_BRANCH 分支"
echo "   4. 推送到远程 main 分支"
echo "   5. 触发 GitHub Actions 部署"
echo "   6. 切换回 $CURRENT_BRANCH 分支"
echo ""
read -p "❓ 确认继续? (y/n): " CONFIRM

if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo "❌ 已取消操作"
    exit 0
fi

echo ""
echo "🔄 开始合并流程..."
echo ""

# 1. 切换到 main 分支
echo "📍 切换到 main 分支..."
git checkout main

if [ $? -ne 0 ]; then
    echo "❌ 切换到 main 分支失败"
    exit 1
fi
echo "✅ 已切换到 main 分支"
echo ""

# 2. 拉取远程最新代码
echo "⬇️  拉取远程 main 分支最新代码..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ 拉取远程代码失败"
    git checkout $CURRENT_BRANCH
    exit 1
fi
echo "✅ 已拉取最新代码"
echo ""

# 3. 合并当前分支
echo "🔀 合并 $CURRENT_BRANCH 分支到 main..."
git merge $CURRENT_BRANCH -m "Merge branch '$CURRENT_BRANCH' into main"

if [ $? -ne 0 ]; then
    echo "❌ 合并失败，可能存在冲突"
    echo "请手动解决冲突后执行："
    echo "  git add ."
    echo "  git commit"
    echo "  git push origin main"
    exit 1
fi
echo "✅ 合并成功"
echo ""

# 4. 推送到远程 main 分支
echo "📤 推送到远程 main 分支..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ 推送失败"
    git checkout $CURRENT_BRANCH
    exit 1
fi
echo "✅ 推送成功"
echo ""

# 5. 显示提交记录
echo "📊 最近的提交记录："
git log --oneline -5
echo ""

# 6. 切换回原分支
echo "📍 切换回 $CURRENT_BRANCH 分支..."
git checkout $CURRENT_BRANCH

if [ $? -eq 0 ]; then
    echo "✅ 已切换回 $CURRENT_BRANCH 分支"
else
    echo "⚠️  切换回原分支失败，当前在 main 分支"
fi
echo ""

# 7. 显示 GitHub Actions 链接
echo "🎉 合并完成！"
echo ""
echo "🚀 GitHub Actions 已触发部署："
echo "   查看部署状态: https://github.com/cafe9k/VibeCodingDemo/actions"
echo ""
echo "📦 部署完成后访问："
echo "   生产环境: https://cafe9k.github.io/VibeCodingDemo/"
echo ""
echo "💡 提示: 部署通常需要 2-3 分钟完成"

