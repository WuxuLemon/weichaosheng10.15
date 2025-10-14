# ⚡ Vercel Blob 快速入门

## 🎯 目标
解决 Vercel 部署时视频和图片无法显示的问题

## ❓ 为什么使用 Vercel Blob？
- Vercel 免费版部署包限制：100MB
- 您的媒体文件大小：~65-260MB
- Blob 将媒体存储在外部，解决大小限制

---

## 🚀 3分钟快速部署

### 1️⃣ 获取 Blob Token

```bash
# 访问 Vercel Dashboard
https://vercel.com/dashboard

# 进入项目 → Storage → Create Blob → 复制 Token
```

### 2️⃣ 上传媒体文件

```bash
# 创建 .env 文件
echo "BLOB_READ_WRITE_TOKEN=你的token" > .env

# 运行上传脚本
npm run upload:blob
```

### 3️⃣ 部署

```bash
git add .
git commit -m "feat: integrate Vercel Blob"
git push origin main
```

✅ **完成！Vercel 会自动部署，媒体文件将正常显示！**

---

## 📂 项目文件说明

| 文件 | 说明 |
|------|------|
| `src/utils/media.js` | 媒体URL管理（自动切换开发/生产环境） |
| `scripts/upload-to-blob.js` | 批量上传脚本 |
| `blob-url-mapping.json` | URL映射文件（上传后自动生成） |
| `.env` | 环境变量（包含Token，不提交到Git） |

---

## 🔄 工作流程

```
开发环境:
getMediaUrl('/video/xxx.mp4')  →  '/video/xxx.mp4' (本地文件)

生产环境:
getMediaUrl('/video/xxx.mp4')  →  'https://xxx.blob.vercel-storage.com/video/xxx.mp4'
```

---

## 📝 组件更新

### 已更新
✅ `yishiduangerenzhuye.vue` (示例)

### 待更新
还有5个组件需要更新，详见 `UPDATE_COMPONENTS.md`

**更新方式**：
```javascript
// 1. 添加导入
import { getMediaUrl } from '../../utils/media.js';

// 2. 包裹路径
videoPath: getMediaUrl('/video/example.mp4')
image: getMediaUrl('/original/image.jpg')
```

---

## 💡 提示

### 开发时
- 使用本地文件，无需上传
- 正常运行 `npm run dev`

### 部署时
- 先运行 `npm run upload:blob`
- 确保 `blob-url-mapping.json` 已提交
- 推送到 GitHub

---

## 🔍 验证成功

部署后检查：
1. 打开生产URL
2. F12 → Network 标签
3. 查看媒体URL是否为 `https://xxx.blob.vercel-storage.com/...`
4. 测试视频播放和图片显示

---

## 📚 详细文档

- 详细设置：`VERCEL_BLOB_SETUP.md`
- 完整部署：`DEPLOYMENT_GUIDE.md`  
- 组件更新：`UPDATE_COMPONENTS.md`
- 总结文档：`VERCEL_BLOB_SUMMARY.md`

---

## 💰 费用
- 免费额度：1GB 存储 + 100GB 带宽/月
- 您的文件：~65-260MB
- **结论**：✅ 完全免费

---

**祝部署顺利！🎉**

