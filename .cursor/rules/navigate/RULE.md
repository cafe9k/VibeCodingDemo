---
alwaysApply: true
---

## 项目导航规则

### 访问地址约束
- 在打开或导航到 VibeCodingDemo 项目时，**始终使用 test.ctripcorp.com 域名访问，而不是 localhost**
- 默认访问地址：`http://test.ctripcorp.com:5173/`
- 在提供访问链接、展示 URL 或使用浏览器工具时，**优先使用 test.ctripcorp.com 地址**

### 导航命令
- 使用浏览器工具导航时：`mcp_cursor-ide-browser_browser_navigate` 传入 `http://test.ctripcorp.com:5173/`
- 使用系统命令打开时：`open http://test.ctripcorp.com:5173/`
- 不要使用 localhost URL，除非明确说明 test.ctripcorp.com 无法访问

### 环境配置说明
- hosts 配置：`127.0.0.1  test.ctripcorp.com`
- Vite 已配置 allowedHosts 支持 test.ctripcorp.com
- 开发服务器运行在 0.0.0.0:5173，支持外部域名访问
