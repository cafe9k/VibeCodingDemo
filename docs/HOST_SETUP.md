# 本地 Host 配置指南

## 修改 hosts 文件

### macOS / Linux

1. **打开终端，编辑 hosts 文件：**

```bash
sudo nano /etc/hosts
```

2. **添加以下配置：**

```
127.0.0.1  test.ctripcorp.com
```

3. **保存并退出：**
   - 按 `Ctrl + O` 保存
   - 按 `Enter` 确认
   - 按 `Ctrl + X` 退出

4. **清除 DNS 缓存：**

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### Windows

1. **以管理员身份打开记事本**
   - 右键点击记事本 → 选择"以管理员身份运行"

2. **打开 hosts 文件：**
   - 文件路径：`C:\Windows\System32\drivers\etc\hosts`

3. **添加以下配置：**

```
127.0.0.1  test.ctripcorp.com
```

4. **保存文件**

5. **刷新 DNS 缓存：**

```cmd
ipconfig /flushdns
```

## 验证配置

### 测试 hosts 是否生效

```bash
ping test.ctripcorp.com
```

应该看到类似输出：

```
PING test.ctripcorp.com (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.053 ms
```

## 启动项目

配置完成后，使用以下命令启动项目：

```bash
npm run dev
```

或者在 Cursor 中使用：

```
/run
```

## 访问地址

配置成功后，可以通过以下地址访问项目：

- **本地地址**：http://localhost:5173
- **自定义域名**：http://test.ctripcorp.com:5173

## 注意事项

1. ⚠️ 修改 hosts 文件需要管理员权限
2. 🔄 修改后需要清除 DNS 缓存才能生效
3. 🌐 hosts 配置只对本机有效
4. 🔒 使用自定义域名可以更好地模拟生产环境

## 故障排除

### 问题1：修改 hosts 后无法访问

**解决方案：**
```bash
# 清除浏览器缓存
# 重新刷新 DNS 缓存
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### 问题2：权限不足

**解决方案：**
```bash
# 确保使用 sudo 命令
sudo nano /etc/hosts
```

### 问题3：端口被占用

**解决方案：**
- `/run` 命令会自动处理端口占用
- 或手动释放端口：`lsof -ti:5173 | xargs kill -9`

## 移除配置

如果需要移除自定义域名配置：

1. 再次编辑 hosts 文件
2. 删除或注释掉该行：`# 127.0.0.1  test.ctripcorp.com`
3. 保存并刷新 DNS 缓存

